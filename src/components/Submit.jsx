import emailjs from '@emailjs/browser';

const sendEmail = async (formData) => {
  const SERVICE_ID = "service_zh0qpyx";
  const TEMPLATE_ID = "template_vj19kbk";
  const PUBLIC_KEY = "stVPgc3mHG7rIAuBM";

  try {
    // Initialize EmailJS with the public key
    emailjs.init(PUBLIC_KEY);

    const templateParams = {
      to_name: "Admin",
      to_email: "bijaybkcollegetools@gmail.com",
      from_name: `${formData.firstName} ${formData.lastName}`,
      from_email: formData.email,
      subject: "New Form Submission",
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      contact: formData.contact,
      gender: formData.gender,
      selected_option: formData.selectedOption,
      subjects: Object.entries(formData.subjects)
        .filter(([_, selected]) => selected)
        .map(([subject]) => subject)
        .join(', '),
      url: formData.url,
      about: formData.about,
      message: `
First Name: ${formData.firstName}
Last Name: ${formData.lastName}
Email: ${formData.email}
Contact: ${formData.contact}
Gender: ${formData.gender}
Selected Option: ${formData.selectedOption}
Subjects: ${Object.entries(formData.subjects)
  .filter(([_, selected]) => selected)
  .map(([subject]) => subject)
  .join(', ')}
URL: ${formData.url}
About: ${formData.about}
      `
    };

    console.log('Sending email with params:', templateParams);

    const response = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      templateParams
    );

    console.log('EmailJS Response:', response);

    if (response.status === 200) {
      return { success: true, message: "Form submitted successfully!" };
    } else {
      throw new Error("Failed to send email");
    }
  } catch (error) {
    console.error("Error sending email:", error);
    return { 
      success: false, 
      message: `Failed to submit form: ${error.text || error.message || 'Unknown error occurred'}` 
    };
  }
};

export default sendEmail;