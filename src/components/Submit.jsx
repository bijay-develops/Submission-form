import emailjs from '@emailjs/browser';

const sendEmail = async (formData) => {
  const SERVICE_ID = "service_zh0qpyx";
  const TEMPLATE_ID = "template_vj19kbk";
  const USER_WELCOME_TEMPLATE_ID = "template_id7e6gd"; // You'll need to create this template
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

    // Send form data to admin
    const adminTemplateParams = {
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

    console.log('Sending email to admin...');
    const adminResponse = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      adminTemplateParams
    );

    // Send welcome email to user
    const userTemplateParams = {
      to_name: formData.firstName,
      user_email: formData.email,
      subject: "Thank you for your submission!",
      content: `
Dear ${formData.firstName},

Thank you for submitting your form. We have received your information and will review it shortly.

Here's a summary of what you submitted:
- Name: ${formData.firstName} ${formData.lastName}
- Selected Subjects: ${selectedSubjects}
- Specialization: ${formData.selectedOption || 'None selected'}

We will contact you at ${formData.email} if we need any additional information.

Best regards,
The Admin Team
      `
    };

    console.log('Sending welcome email to user...');
    const userResponse = await emailjs.send(
      SERVICE_ID,
      USER_WELCOME_TEMPLATE_ID,
      userTemplateParams
    );

    console.log('Admin Email Response:', adminResponse);
    console.log('User Welcome Email Response:', userResponse);

    if (adminResponse.status === 200 && userResponse.status === 200) {
      console.log('All emails sent successfully!');
      return { 
        success: true, 
        message: "Form submitted successfully! Please check your email for confirmation." 
      };
    } else {
      throw new Error("Failed to send one or more emails");
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