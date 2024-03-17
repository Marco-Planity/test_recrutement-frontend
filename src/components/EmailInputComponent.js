import React, { useEffect, useRef, useState } from 'react';


// providers
const emailProviders = [
    "orange.fr",
    "outlook.fr",
    "gmail.com",
    "hotmail.fr",
    "outlook.com",
    "hotmail.com",
    "wanadoo.fr",
    "yahoo.fr",
    "laposte.net",
    "yahoo.com",
    "sfr.fr",
    "msn.com",
    "live.fr",
    "free.fr",
    "numericable.fr",
    "bbox.fr",
    "neuf.fr"
];


function EmailInputComponent() {
    const [email, setEmail] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const emailInputRef = useRef(null);

    //check if email is valide
function isValidEmail(email) {
    const pattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return pattern.test(email);
  }
  useEffect(() => {
    if(isValidEmail(email) === true) {
        setSuggestions([]); 
    };
}, [email]);

    const filterProviders = (input) => {
        if (!input.includes('@')) return emailProviders.slice(0, 3); //if the input doesn't contain the character "@", display the 3 most popular providers
        //create an array and select the second one
        const domainPart = input.split('@')[1].toLowerCase();
        // use startsWith method to filter providers
    const matchLetter = emailProviders.filter(provider => provider.startsWith(domainPart)).slice(0, 3);
    // if matchLetter is empty return the 3 most popular providers otherwise return the 3 best matches
    if (matchLetter.length === 0) {
        return emailProviders.slice(0, 3);
    } else {
        return matchLetter;
    }
    };

    const handleInputChange = (e) => {
        const inputValue = e.target.value;
        setEmail(inputValue);
        //call filterProvider function
        const newSuggestions = filterProviders(inputValue);
        //set suggestions after filtered
        setSuggestions(newSuggestions);

    };


    return (
        <div style={{display:'flex', flexDirection:'row', gap:30, padding:20}}>
            <input
            style={{minHeight: 38, width: 256, paddingLeft: 10}}
                type="text"
                value={email}
                placeholder='Adresse email'
                ref={emailInputRef}
                onChange={handleInputChange}
            />
            <div style={{display:'flex', flexDirection:'row', gap: 10, margin:'auto 10px auto 10px'}}>
                {suggestions.map((provider, index) => (
                    <a style={{cursor:'pointer'}} key={index} onClick={() => {
                        setEmail(email.split('@')[0] + '@' + provider);
                        setSuggestions([]); 
                        emailInputRef.current.focus();
                    }}>
                        @{provider}
                    </a>
                ))}
            </div>
        </div>
    );
}

export default EmailInputComponent;
