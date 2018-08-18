export const handleErrors = error => {
    const err = parseInt(error);
    if(err == 5881) return "Validation error."
    if(err == 5882) return "Same username as password."
    if(err == 5883) return "Username not available."
    if(err == 5884) return "Username error 10 digits."
    if(err == 5885) return "Username is blank."
    if(err == 5886) return "Username error."
    if(err == 5887) return "Authentication error."
    if(err == 5888) return "Password username match."
    if(err == 5889) return "Password mismatch."
    if(err == 5916) return "Password is null."
    if(err == 5917) return "We are unable to complete your request at this time. Please try again later."
    if(err == 5912) return "Profile not found."
    if(err == 5891) return "Password invalid format."
    if(err == 5817) return "We are currently unable to update your email address. Please check the format and re-enter."
    if(err == 5818) return "Vtext.com is a text messaging address and not a valid email address. Please enter an email address."
    if(err == 5819) return "We are currently unable to update your primary email address."
    if(err == 5855) return "Please enter your Contact Number. Thank you."
    if(err == 5816) return "Invalid Alternative Phone."
    if(err == 30164) return "Please make changes to either your Primary Phone Number or your Alternate Phone Number and click Save to continue."
    if(err == 2220) return `Invalid characters entered, please do not use characters like <>"'%;&()+`
    else return "Something went wrong."
  };