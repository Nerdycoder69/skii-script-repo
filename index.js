const puppeteer = require('puppeteer');

const information = [
    {
        selectCourse: '',
        courseLevel: '',
        courseSchedule: '',
        name: '',
        fatherName: '',
        nationality: '',
        dateOfBirth: '',
        birthProof: '',
        domicile: '',
        domicileProof: '',
        houseNo: '',
        village: '',
        city: '',
        pincode: '',
        state: '',
        email: '',
        mobileNumber: '7908199097',
        education: '',
        educationProof: '',
        vegNonVeg: '',
        bloodGroup: '',
        height: '',
        weight: '',
        waist: '',
        shoeSize: '',
        photoOfApplicant: '',
        signature: '',



}
]

(async () => {
    information.forEach( async (person) => {
        // Launch a new browser instance
        const browser = await puppeteer.launch({headless: false});
        const page = await browser.newPage();
    
        // Navigate to the first Page
        await page.goto('https://www.iismgulmarg.in/Admission_instructions.aspx');
    
        // Fill in Mobile Number
        await page.type('#txtMobileNo', person.mobileNumber);
    
        // Submit mobile number
        await Promise.all([
            page.click('#lnkbtnSubmit'),
            page.waitForNavigation({ waitUntil: 'networkidle0' })  // Wait for navigation to complete
        ]);
    
        // Check the terms and conditions if not already checked
        const isChecked = await page.$eval('#chkAccept', checkbox => checkbox.checked);
        if (!isChecked) {
            await page.click('#chkAccept');
        }
        
        // Click on the next button to go to the final form
        await Promise.all([
        await page.click('#lnkbtnNext'),
            page.waitForNavigation({ waitUntil: 'networkidle0' })  // Wait for navigation to complete
        ]);

        
        await page.waitForTimeout(4000);
        await browser.close();

    })
})();