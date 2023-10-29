const puppeteer = require('puppeteer');

const information = [
    {
        selectCourse: '',
        courseLevel: '',
        courseSchedule: '',
        name: 'Testing',
        fatherName: 'Test',
        nationality: 'India',
        dateOfBirth: '',
        birthProof: './documents/birthCert.jpeg',
        houseNo: '343',
        village: 'Salt Lake',
        city: 'Kolkata',
        pincode: '733101',
        state: '19',
        email: 'test@gmail.com',
        mobileNumber: '7908199097',
        education: 'High School',
        educationProof: './documents/birthCert.jpeg',
        vegNonVeg: 'Vegetarian',
        bloodGroup: 'B-',
        height: '6foot',
        weight: '120pounds',
        waist: '36',
        shoeSize: '7UK',
        photoOfApplicant: './documents/birthCert.jpeg',
        signature: './documents/birthCert.jpeg'
}
]

const runScript = async () => {
    const browser = await puppeteer.launch({headless: false});

    for (let person of information) {
        const page = await browser.newPage();
    
        // Navigate to the first Page
        await page.goto('https://www.iismgulmarg.in/Admission_instructions.aspx');
    
        // Fill in Mobile Number
        await page.type('#txtMobileNo', person.mobileNumber);
    
        // Submit mobile number
        await  page.click('#lnkbtnSubmit')
        await  page.waitForNavigation({ waitUntil: 'networkidle0' })
    
        // Check the terms and conditions if not already checked
        const isChecked = await page.$eval('#chkAccept', checkbox => checkbox.checked);
        if (!isChecked) {
            await page.click('#chkAccept');
        }
        
        // Click on the next button to go to the final form
        await page.click('#lnkbtnNext')
        await page.waitForNavigation({ waitUntil: 'networkidle0' })
    
        await page.type('#txtName', person.name)
        await page.type('#txtFatherName', person.fatherName)
        await page.type('#txtNationality', person.nationality)
        await page.type('#txtDateOfBirth', person.dateOfBirth)

        await page.waitForSelector('#FupBirthCertificate');
        const dobInput = await page.$('#FupBirthCertificate');
        await dobInput.uploadFile(person.birthProof);

        await page.type('#txtHouseNoApartment', person.houseNo)
        await page.type('#txtStreetVillageColony', person.village)
        await page.type('#txtDistrictCity', person.city)
        await page.type('#txtPincode', person.pincode)
        await page.type('#txtEmailId', person.email)

        await page.waitForSelector('#ddlState');
        await page.select('#ddlState', person.state);

        await page.waitForSelector('#ddlEduationQualification');
        await page.select('#ddlEduationQualification', person.education);

        await page.waitForSelector('#ddlVegetarianOrNon');
        await page.select('#ddlVegetarianOrNon', person.vegNonVeg);

        await page.waitForSelector('#FupEducationQualification');
        const eduProof = await page.$('#FupEducationQualification');
        await eduProof.uploadFile(person.educationProof);

        await page.type('#txtBloodGroup', person.bloodGroup)
        await page.type('#txtHeight', person.height)
        await page.type('#txtWeight', person.weight)
        await page.type('#txtWaist', person.waist)
        await page.type('#txtShoeSize', person.shoeSize)

        await page.waitForSelector('#FupPhototOfApplicant');
        const appPhoto = await page.$('#FupPhototOfApplicant');
        await appPhoto.uploadFile(person.photoOfApplicant);

        await page.waitForSelector('#FupSignatureOfAppicant');
        const appSignature = await page.$('#FupSignatureOfAppicant');
        await appSignature.uploadFile(person.signature);

        await page.click('#chkIAgree') // Check the final terms and conditions

        // Submit the final form
        // await   page.click('#btnSubmit'),
        // await   page.waitForNavigation({ waitUntil: 'networkidle0' })


        await page.screenshot({path: `./SKii_${person.name}.png`, fullPage: true})

        await page.close();
    }

    await browser.close();
}

runScript()