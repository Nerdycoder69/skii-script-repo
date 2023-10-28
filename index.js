const puppeteer = require('puppeteer');

const information = [
    {
        selectCourse: '',
        courseLevel: '',
        courseSchedule: '',
        name: '',
        fatherName: '',
        nationality: 'India',
        dateOfBirth: '',
        birthProof: '',
        domicile: '',
        domicileProof: '',
        houseNo: '',
        village: '',
        city: '',
        pincode: '',
        state: 'West Bengal',
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
    const browser = await puppeteer.launch({headless: false});

    for (let person of information) {
        const page = await browser.newPage();
    
        // Navigate to the first Page
        await page.goto('https://www.iismgulmarg.in/Admission_instructions.aspx');
    
        // Fill in Mobile Number
        await page.type('#txtMobileNo', person.mobileNumber);
    
        // Submit mobile number
        await Promise.all([
            page.click('#lnkbtnSubmit'),
            page.waitForNavigation({ waitUntil: 'networkidle0' })
        ]);
    
        // Check the terms and conditions if not already checked
        const isChecked = await page.$eval('#chkAccept', checkbox => checkbox.checked);
        if (!isChecked) {
            await page.click('#chkAccept');
        }
        
        // Click on the next button to go to the final form
        await Promise.all([
            page.click('#lnkbtnNext'),
            page.waitForNavigation({ waitUntil: 'networkidle0' })
        ]);
    
        await page.type('#txtName', person.name)
        await page.type('#txtFatherName', person.fatherName)
        await page.type('#txtNationality', person.nationality)
        await page.type('#txtDateOfBirth', person.dateOfBirth)

        await page.close();
    }

    await browser.close();
})();