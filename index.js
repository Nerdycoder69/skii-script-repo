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
        birthProof: '/documents/birthProof.jpg',
        houseNo: '',
        village: '',
        city: '',
        pincode: '',
        state: 'WEST BENGAL',
        email: '',
        mobileNumber: '7908199097',
        education: '',
        educationProof: '',
        vegNonVeg: 'Vegetarian',
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

        await page.waitForSelector('#FupBirthCertificate');
        const dobInput = await page.$('#FupBirthCertificate');
        await dobInput.uploadFile(information.birthProof);

        await page.type('#txtHouseNoApartment', information.houseNo)
        await page.type('#txtStreetVillageColony', information.village)
        await page.type('#txtDistrictCity', information.city)
        await page.type('#txtPincode', information.pincode)

        await page.waitForSelector('#ddlState');
        await page.select('#ddlState', information.state);

        await page.waitForSelector('#ddlEduationQualification');
        await page.select('#ddlEduationQualification', information.education);

        await page.waitForSelector('#ddlVegetarianOrNon');
        await page.select('#ddlVegetarianOrNon', information.vegNonVeg);

        await page.waitForSelector('#FupEducationQualification');
        const eduProof = await page.$('#FupEducationQualification');
        await eduProof.uploadFile(information.educationProof);

        await page.type('#txtBloodGroup', information.bloodGroup)
        await page.type('#txtHeight', information.height)
        await page.type('#txtWeight', information.weight)
        await page.type('#txtWaist', information.waist)
        await page.type('#txtShoeSize', information.shoeSize)

        await page.waitForSelector('#FupPhototOfApplicant');
        const appPhoto = await page.$('#FupPhototOfApplicant');
        await appPhoto.uploadFile(information.photoOfApplicant);

        await page.waitForSelector('#FupSignatureOfAppicant');
        const appSignature = await page.$('#FupSignatureOfAppicant');
        await appSignature.uploadFile(information.signature);

        await page.click('#chkIAgree') // Check the final terms and conditions

        // Submit the final form
        await Promise.all([
            page.click('#btnSubmit'),
            page.waitForNavigation({ waitUntil: 'networkidle0' })
        ]);

        await page.screenshot({path: `SKii_${information.name}`})

        await page.close();
    }

    await browser.close();
})();