import emailjs from '@emailjs/browser';

const sendEmail = async (formData) => {
  const SERVICE_ID = "service_zh0qpyx";
  const TEMPLATE_ID = "template_vj19kbk";
  const PUBLIC_KEY = "stVPgc3mHG7rIAuBM";

  try {
    console.log('Starting email submission process...');
    
    // Initialize EmailJS
    emailjs.init(PUBLIC_KEY);
    console.log('EmailJS initialized');

    // Format the subjects list
    const selectedSubjects = Object.entries(formData.subjects)
      .filter(([_, selected]) => selected)
      .map(([subject]) => subject)
      .join(', ');

    console.log('Creating email template parameters...');
    const templateParams = {
      from_name: `${formData.firstName} ${formData.lastName}`,
      reply_to: formData.email,
      subject: `New Form Submission from ${formData.firstName} ${formData.lastName}`,
      content: `
Personal Information:
-------------------
First Name: ${formData.firstName}
Last Name: ${formData.lastName}
Email: ${formData.email}
Contact: ${formData.contact}
Gender: ${formData.gender}

Academic Details:
---------------
Selected Subjects: ${selectedSubjects}
Specialization: ${formData.selectedOption || 'None selected'}

Additional Information:
--------------------
URL: ${formData.url}
About: ${formData.about}

Submission Time: ${new Date().toLocaleString()}
      `
    };

    console.log('Template parameters:', templateParams);

    console.log('Attempting to send email...');
    const response = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      templateParams
    );

    console.log('Email API Response:', response);

    if (response.status === 200) {
      console.log('Email sent successfully!');
      return { 
        success: true, 
        message: "Form submitted successfully! The admin will review your submission." 
      };
    } else {
      console.error('Unexpected response status:', response.status);
      throw new Error(`Failed to send email: Status ${response.status}`);
    }
  } catch (error) {
    console.error('Detailed error information:', {
      name: error.name,
      message: error.message,
      stack: error.stack,
      text: error.text
    });
    
    return { 
      success: false, 
      message: `Failed to submit form: ${error.text || error.message || 'Unknown error occurred'}` 
    };
  }
};

export default sendEmail;