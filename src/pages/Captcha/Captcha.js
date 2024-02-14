import React from 'react'
import { useState, useEffect } from 'react';
function Captcha() {
    const [captchavalue, setCaptchavalue] = useState('');
    //captcha script
    // Function to generate a random string of characters for the CAPTCHA
    function generateRandomString(length, latterCase) {
        //Latter Case 
        //1->Upper case & number
        //2->Lower case & number
        let characters;
        if (latterCase == 1) {
            //Upper case & number
            characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        } else {
            //Lower case & number
            characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
        }

        let result = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            result += characters.charAt(randomIndex);
        }
        return result;
    }

    // Function to create a new CAPTCHA
    function createCaptcha() {
        console.log("calling")
        const c1 = generateRandomString(1, 1);
        const c2 = generateRandomString(1, 2);
        const c3 = generateRandomString(1, 1);
        const c4 = generateRandomString(1, 2);
        const c5 = generateRandomString(1, 1);
        //assign to the hidden input
        setCaptchavalue("" + c1 + c2 + c3 + c4 + c5);
        //document.getElementById("captchavalue").value=""+c1+c2+c3+c4+c5;
        const lightBackgroundColors = [
            '#FFE4E1', // Misty Rose
            '#F0FFF0', // Honeydew
            '#FAF0E6', // Linen
            '#FFF5EE', // Seashell
            '#F5FFFA', // Mint Cream
            '#FFE4B5', // Moccasin
            '#FFFACD', // Lemon Chiffon
            '#F0E68C', // Khaki
            '#FFDAB9', // Peachpuff
            '#E6E6FA', // Lavender
        ];
        const randomNumber = Math.floor(Math.random() * 10);
        const captchaDiv = document.getElementById('captcha');
        captchaDiv.innerHTML = `
        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            viewBox="0 0 150 50" style="enable-background:new 0 0 150 50;" xml:space="preserve">
        <style type="text/css">
            .st0{fill:none;}
            .st1{fill:#C6DD7F;}
            .st2{fill:#E9DDB7;}
            .st3{fill:#A6D0E4;}
            .st4{fill:${lightBackgroundColors[randomNumber]};}
            .st5{fill:#ED1E79;}
            .st6{font-family:'LucidaHandwriting-Italic';}
            .st7{font-size:47.4296px;}
            .st8{fill:#93278F;}
            .st9{font-size:36.7151px;}
            .st10{fill:#FBB03B;}
            .st11{font-size:50.244px;}
            .st12{fill:#0000FF;}
            .st13{font-size:35.945px;}
            .st14{fill:#FF0000;}
            .st15{font-size:51.4373px;}
            .st16{fill:url(#SVGID_1_);}
            .st17{fill:url(#SVGID_2_);}
        </style>
        <pattern  y="50" width="144.1" height="138.4" patternUnits="userSpaceOnUse" id="Alyssa" viewBox="100 -203.1 144.1 138.4" style="overflow:visible;">
            <g>
                <rect x="100" y="-203.1" class="st0" width="144.1" height="138.4"/>
                <g>
                    <rect x="100" y="-203.1" class="st0" width="144.1" height="138.4"/>
                    <g>
                        <path class="st1" d="M311.1-223.3c-11.8,1.4-19.4-0.3-22.6-3.1c-3-2.5-5-5.4-2.3-11.9c2.9-7.1,1.5-14.7-5.5-15.9
                            c-6.2-1-10.9,4.8-11.2,12.3c-0.2,5.2-1.9,8.3-5.5,7.6s-4.6-5.9-3.6-11.8c1.4-8.1,5.5-11.8,6.2-20.2c0.5-6.1-2.9-13.7-12.5-15
                            c-9.3-1.4-15.9,4.3-16.6,10.5c-0.7,6.6,3.6,10.9,3.1,17.6s-4,10.2-5.9,17.3c-2.8,10.6,1.2,19,7.8,22.7c14.8,8.1,22.8-3.6,36-1.6
                            c10.9,1.7,23.4,18.2,33,19.5c8.2,1.2,13.8-4.7,15-14C327.7-218.6,321.7-224.5,311.1-223.3z M268.9-223.8c0,2.3-1.9,4.1-4.1,4.1
                            s-4.1-1.9-4.1-4.1c0-2.3,1.9-4.2,4.1-4.2S268.9-226.1,268.9-223.8z M318.3-208.4c0,1-0.8,1.7-1.7,1.7s-1.7-0.8-1.7-1.7
                            c0-1,0.8-1.7,1.7-1.7S318.3-209.3,318.3-208.4z"/>
                    </g>
                    <g>
                        <path class="st2" d="M148.8-204.1c0-7.2,4.6-13.8-1-16.3c-8.5-3.8-28,14.3-28,36.2c0,12,8.7,19,17.8,19c12.3,0,18-8.2,18-17.5
                            C155.6-192.1,148.8-195.9,148.8-204.1z M143.4-198.7c0,1.2-0.9,2.1-2.1,2.1c-1.1,0-2.1-0.9-2.1-2.1s0.9-2.1,2.1-2.1
                            C142.5-200.8,143.4-199.8,143.4-198.7z"/>
                        <path class="st3" d="M223.5-227.6c-7.9-2.7-19.4,15.3-17.7,27c1.2,8.2,7.1,13.2,13.1,14.2c7.5,1.3,12.9-2.6,13.3-7.2
                            c0.6-6.3-3.6-7.5-4.2-15C227.4-215.7,231.7-224.7,223.5-227.6z M219.7-200c0,1.4-1.2,2.6-2.6,2.6s-2.6-1.2-2.6-2.6
                            c0-1.4,1.2-2.6,2.6-2.6C218.5-202.6,219.7-201.5,219.7-200z"/>
                        <path class="st2" d="M119.4-205.1c0-1.4-1.2-2.6-2.6-2.6c-1.4,0-2.6,1.2-2.6,2.6s1.2,2.6,2.6,2.6
                            C118.2-202.5,119.4-203.7,119.4-205.1z"/>
                        <path class="st3" d="M184.6-197.4c0.7-8.1,12.7-7,17.9-14.2c10.5-14.5-1.2-46.4-21.6-46.4c-11.7,0-24.2,9.7-24.2,29.2
                            c0,15.8,10.2,21.5,8.3,42.2c-1,10.8-12.5,20.3-12.5,34.8c0,5.9,3.6,13.4,11.6,13.4c7.1,0,10.8-5.9,10.8-12.9
                            c0-6.8-5.4-15.7,1.4-19.1c5.2-2.6,13.2,4.8,19.5,6.8c5.2,1.6,12.4-0.2,14.8-8.5c2.5-8.9-3.3-14.8-11.6-16.7
                            C192.5-190.2,184-190.9,184.6-197.4z M168.6-166.8c0,1.8-1.5,3.3-3.3,3.3c-1.8,0-3.3-1.5-3.3-3.3c0-1.8,1.5-3.3,3.3-3.3
                            S168.6-168.6,168.6-166.8z M194.6-176.5c1.3,0,2.3,1,2.3,2.3s-1,2.3-2.3,2.3c-1.3,0-2.3-1-2.3-2.3
                            C192.3-175.5,193.3-176.5,194.6-176.5z M174.6-236.2c0,1.8-1.5,3.3-3.3,3.3c-1.8,0-3.3-1.5-3.3-3.3c0-1.8,1.5-3.3,3.3-3.3
                            C173.1-239.5,174.6-238,174.6-236.2z"/>
                        <path class="st1" d="M166.9-223.3c-11.8,1.4-19.4-0.3-22.6-3.1c-3-2.5-5-5.4-2.3-11.9c2.9-7.1,1.5-14.7-5.5-15.9
                            c-6.2-1-10.9,4.8-11.2,12.3c-0.2,5.2-1.9,8.3-5.5,7.6s-4.6-5.9-3.6-11.8c1.4-8.1,5.5-11.8,6.2-20.2c0.5-6.1-2.9-13.7-12.4-15
                            c-9.3-1.4-15.9,4.3-16.6,10.5c-0.7,6.6,3.6,10.9,3.1,17.6s-4,10.2-5.9,17.3c-2.8,10.6,1.2,19,7.8,22.7c14.8,8.1,22.8-3.6,36-1.6
                            c10.9,1.7,23.4,18.2,33,19.5c8.2,1.2,13.8-4.7,15-14C183.5-218.6,177.6-224.5,166.9-223.3z M124.7-223.8c0,2.3-1.9,4.1-4.2,4.1
                            s-4.2-1.9-4.2-4.1c0-2.3,1.9-4.2,4.2-4.2S124.7-226.1,124.7-223.8z M174.2-208.4c0,1-0.8,1.7-1.7,1.7c-1,0-1.7-0.8-1.7-1.7
                            c0-1,0.8-1.7,1.7-1.7S174.2-209.3,174.2-208.4z"/>
                    </g>
                    <g>
                        <path class="st3" d="M290.3-176.7c0-6.2-4.1-10.7-8.6-11.6s-8.3,1.3-13-1.2c-4.8-2.6-7.1-11.1-16.8-11.1c-8,0-15.2,8-15.2,18.9
                            c0,20.2,13.1,29.2,25.6,29.2C278.9-152.5,290.3-165.1,290.3-176.7z M270.6-162.4c0,2.1-1.7,3.8-3.8,3.8c-2.1,0-3.8-1.7-3.8-3.8
                            s1.7-3.8,3.8-3.8S270.6-164.5,270.6-162.4z"/>
                        <path class="st1" d="M311.1-84.9c-11.8,1.4-19.4-0.4-22.6-3.1c-3-2.5-5-5.4-2.3-11.9c2.9-7.1,1.5-14.7-5.5-15.9
                            c-6.2-1-10.9,4.8-11.2,12.3c-0.2,5.2-1.9,8.3-5.5,7.6s-4.6-5.9-3.6-11.8c1.4-8.1,5.5-11.8,6.2-20.2c0.5-6.1-2.9-13.7-12.5-15
                            c-9.3-1.4-15.9,4.3-16.6,10.6c-0.7,6.6,3.6,10.9,3.1,17.6s-4,10.2-5.9,17.3c-2.8,10.6,1.2,19,7.8,22.6c14.8,8.1,22.8-3.6,36-1.6
                            c10.9,1.7,23.4,18.2,33,19.5c8.2,1.2,13.8-4.7,15-14C327.7-80.2,321.7-86.1,311.1-84.9z M268.9-85.4c0,2.3-1.9,4.1-4.1,4.1
                            s-4.1-1.9-4.1-4.1s1.9-4.1,4.1-4.1S268.9-87.7,268.9-85.4z M318.3-70c0,1-0.8,1.7-1.7,1.7s-1.7-0.8-1.7-1.7c0-1,0.8-1.7,1.7-1.7
                            S318.3-71,318.3-70z"/>
                    </g>
                    <g>
                        <path class="st3" d="M131.8-148.4c-14-2-21.2,13.3-17.7,20.3c3.7,7.3,12.1,4.2,19.5,4.2c9.7,0,16.4,7.6,20.4,2.3
                            C158.3-127.2,149-145.9,131.8-148.4z M132.3-130.9c0,1.2-1,2.3-2.3,2.3s-2.3-1-2.3-2.3s1-2.3,2.3-2.3
                            C131.3-133.1,132.3-132.1,132.3-130.9z"/>
                        <path class="st2" d="M148.8-65.7c0-7.2,4.6-13.8-1-16.3c-8.5-3.8-28,14.3-28,36.2c0,12,8.7,19,17.8,19c12.3,0,18-8.2,18-17.5
                            C155.6-53.7,148.8-57.5,148.8-65.7z M143.4-60.3c0,1.1-0.9,2.1-2.1,2.1c-1.1,0-2.1-0.9-2.1-2.1c0-1.1,0.9-2.1,2.1-2.1
                            C142.5-62.4,143.4-61.5,143.4-60.3z"/>
                        <path class="st3" d="M146.2-176.7c0-6.2-4.1-10.7-8.6-11.6s-8.3,1.3-13-1.2c-4.8-2.6-7.1-11.1-16.8-11.1c-8,0-15.2,8-15.2,18.9
                            c0,20.2,13.1,29.2,25.6,29.2C134.8-152.5,146.2-165.1,146.2-176.7z M126.4-162.4c0,2.1-1.7,3.8-3.8,3.8c-2.1,0-3.8-1.7-3.8-3.8
                            s1.7-3.8,3.8-3.8C124.7-166.2,126.4-164.5,126.4-162.4z"/>
                        <path class="st1" d="M145.5-153c0-1.3-1.1-2.4-2.4-2.4s-2.4,1.1-2.4,2.4s1.1,2.4,2.4,2.4S145.5-151.7,145.5-153z"/>
                        <path class="st3" d="M229.2-134.5c-3.2-4.7,1-10.7-1.4-15.2s-6.7-5-9.9-2.6c-3.6,2.8-3.4,6.6-8.3,8.8c-5.5,2.5-18-2.3-19.7,7.3
                            c-0.9,4.8,2.4,8.6,7.3,9.7c6.1,1.4,9.4,0.2,15.4,3.1c6.1,2.9,11.2,9,22.1,12.1c10.4,3,16.1-1.6,16.6-5.9
                            C252.3-125.7,234.2-127.2,229.2-134.5z M226.9-127.1c0,1.2-1,2.3-2.3,2.3s-2.3-1-2.3-2.3s1-2.3,2.3-2.3
                            C225.9-129.3,226.9-128.3,226.9-127.1z"/>
                        <path class="st2" d="M256.1-173.7c0-17.2-14.5-25.5-27-22.8c-10.3,2.2-12.8,17.3-16.7,26.2c-3.7,8.6-8.8,22.5-20.2,22.5
                            c-11.2,0-12.8-14.5-23.7-14.5c-11,0-24.5,15.7-24.5,39.7c0,14.7,9.8,31.5,20.8,30.7c11.7-0.8,4.5-19.7,15.3-19.7
                            c9.5,0,7.9,16.3,9.2,23.3c1.7,9,6.8,14.2,18.5,13.2c14.4-1.2,22.3-13.5,18.9-23.3c-4-11.4-23.9-17.3-21.5-30.5
                            c1.4-7.6,13-12,26-16.2C245.8-149.9,256.1-156.5,256.1-173.7z M211.2-97.9c0-1.8,1.5-3.3,3.3-3.3c1.8,0,3.3,1.5,3.3,3.3
                            s-1.5,3.3-3.3,3.3C212.7-94.6,211.2-96,211.2-97.9z M164.5-122.8c0,1-0.8,1.7-1.7,1.7c-1,0-1.7-0.8-1.7-1.7c0-1,0.8-1.7,1.7-1.7
                            C163.7-124.5,164.5-123.7,164.5-122.8z M182-133.5c0,2.1-1.7,3.8-3.8,3.8s-3.8-1.7-3.8-3.8s1.7-3.8,3.8-3.8
                            C180.3-137.3,182-135.6,182-133.5z M201.8-117.9c0,0.9-0.7,1.6-1.6,1.6s-1.6-0.7-1.6-1.6s0.7-1.6,1.6-1.6
                            S201.8-118.8,201.8-117.9z M231.5-172.6c0,1.8-1.4,3.2-3.2,3.2s-3.2-1.4-3.2-3.2s1.4-3.2,3.2-3.2
                            C230.1-175.8,231.5-174.4,231.5-172.6z"/>
                        <path class="st3" d="M223.5-89.2c-7.9-2.7-19.4,15.3-17.7,27c1.2,8.2,7.1,13.2,13.1,14.2c7.5,1.3,12.9-2.6,13.3-7.2
                            c0.6-6.3-3.6-7.5-4.2-15C227.4-77.3,231.7-86.3,223.5-89.2z M219.7-61.7c0,1.4-1.2,2.6-2.6,2.6s-2.6-1.2-2.6-2.6
                            s1.2-2.6,2.6-2.6C218.5-64.3,219.7-63.1,219.7-61.7z"/>
                        <path class="st2" d="M119.4-66.7c0-1.4-1.2-2.6-2.6-2.6c-1.4,0-2.6,1.2-2.6,2.6s1.2,2.6,2.6,2.6
                            C118.2-64.1,119.4-65.3,119.4-66.7z"/>
                        <path class="st2" d="M253.4-153.5c0,8.4-5.1,15.2-11.3,15.2s-11.3-6.8-11.3-15.2c0-8.4,5.1-12.4,11.3-12.4
                            S253.4-161.9,253.4-153.5z"/>
                        <path class="st3" d="M184.6-59c0.7-8.1,12.7-7,17.9-14.2c10.5-14.5-1.2-46.4-21.6-46.4c-11.7,0-24.2,9.7-24.2,29.2
                            c0,15.8,10.2,21.5,8.3,42.2c-1,10.8-12.5,20.3-12.5,34.7C152.4-7.5,156,0,163.9,0c7.1,0,10.8-6,10.8-12.9
                            c0-6.8-5.4-15.7,1.4-19.1c5.2-2.6,13.2,4.8,19.5,6.7c5.2,1.6,12.4-0.2,14.8-8.5c2.5-8.9-3.3-14.8-11.6-16.7
                            C192.5-51.9,184-52.6,184.6-59z M168.6-28.4c0,1.8-1.5,3.3-3.3,3.3c-1.8,0-3.3-1.5-3.3-3.3c0-1.8,1.5-3.3,3.3-3.3
                            S168.6-30.3,168.6-28.4z M194.6-38.1c1.3,0,2.3,1,2.3,2.3c0,1.3-1,2.3-2.3,2.3c-1.3,0-2.3-1-2.3-2.3
                            C192.3-37.1,193.3-38.1,194.6-38.1z M174.6-97.8c0,1.8-1.5,3.3-3.3,3.3c-1.8,0-3.3-1.5-3.3-3.3c0-1.8,1.5-3.3,3.3-3.3
                            C173.1-101.1,174.6-99.6,174.6-97.8z"/>
                        <path class="st1" d="M166.9-84.9c-11.8,1.4-19.4-0.4-22.6-3.1c-3-2.5-5-5.4-2.3-11.9c2.9-7.1,1.5-14.7-5.5-15.9
                            c-6.2-1-10.9,4.8-11.2,12.3c-0.2,5.2-1.9,8.3-5.5,7.6s-4.6-5.9-3.6-11.8c1.4-8.1,5.5-11.8,6.2-20.2c0.5-6.1-2.9-13.7-12.4-15
                            c-9.3-1.4-15.9,4.3-16.6,10.6c-0.7,6.6,3.6,10.9,3.1,17.6s-4,10.2-5.9,17.3c-2.8,10.6,1.2,19,7.8,22.6c14.8,8.1,22.8-3.6,36-1.6
                            c10.9,1.7,23.4,18.2,33,19.5c8.2,1.2,13.8-4.7,15-14C183.5-80.2,177.6-86.1,166.9-84.9z M124.7-85.4c0,2.3-1.9,4.1-4.2,4.1
                            s-4.2-1.9-4.2-4.1s1.9-4.1,4.2-4.1S124.7-87.7,124.7-85.4z M174.2-70c0,1-0.8,1.7-1.7,1.7c-1,0-1.7-0.8-1.7-1.7
                            c0-1,0.8-1.7,1.7-1.7S174.2-71,174.2-70z"/>
                        <path class="st1" d="M230.2-107.2c0-0.8-0.6-1.4-1.4-1.4c-0.8,0-1.4,0.6-1.4,1.4c0,0.8,0.6,1.4,1.4,1.4S230.2-106.4,230.2-107.2
                            z"/>
                        <path class="st2" d="M235.7-68.8c0-1.2-1-2.3-2.3-2.3s-2.3,1-2.3,2.3s1,2.3,2.3,2.3S235.7-67.6,235.7-68.8z"/>
                        <path class="st3" d="M152.2-92c0-0.7-0.5-1.2-1.2-1.2s-1.2,0.5-1.2,1.2s0.5,1.2,1.2,1.2S152.2-91.3,152.2-92z"/>
                        <path class="st3" d="M148.6-160.5c0-0.8-0.6-1.4-1.4-1.4s-1.4,0.6-1.4,1.4c0,0.8,0.6,1.4,1.4,1.4S148.6-159.7,148.6-160.5z"/>
                        <path class="st2" d="M233.1-138.5c0-0.7-0.5-1.2-1.2-1.2c-0.7,0-1.2,0.5-1.2,1.2c0,0.7,0.5,1.2,1.2,1.2S233.1-137.8,233.1-138.5
                            z"/>
                        <path class="st1" d="M195.9-156.4c0-1.9-1.5-3.4-3.4-3.4s-3.4,1.5-3.4,3.4c0,1.9,1.5,3.4,3.4,3.4S195.9-154.5,195.9-156.4z"/>
                        <path class="st2" d="M200.8-196.3c0-1.2-0.9-2.1-2.1-2.1s-2.1,0.9-2.1,2.1s0.9,2.1,2.1,2.1S200.8-195.1,200.8-196.3z"/>
                        <path class="st2" d="M162-190c0-0.9-0.7-1.6-1.6-1.6c-0.9,0-1.6,0.7-1.6,1.6s0.7,1.6,1.6,1.6C161.3-188.4,162-189.1,162-190z"/>
                        <circle class="st1" cx="233.1" cy="-75.9" r="2.6"/>
                        <circle class="st3" cx="223.1" cy="-110.8" r="2.4"/>
                        <path class="st2" d="M127.7-117.4c0-1.4-1.2-2.6-2.6-2.6c-1.4,0-2.6,1.2-2.6,2.6s1.2,2.6,2.6,2.6
                            C126.5-114.7,127.7-115.9,127.7-117.4z"/>
                        <path class="st3" d="M122.7-110.3c0-0.7-0.6-1.3-1.3-1.3s-1.3,0.6-1.3,1.3s0.6,1.3,1.3,1.3C122.1-109,122.7-109.6,122.7-110.3z"
                            />
                        <path class="st2" d="M186.9-162.2c0-0.9-0.7-1.6-1.6-1.6c-0.9,0-1.6,0.7-1.6,1.6c0,0.9,0.7,1.6,1.6,1.6
                            C186.2-160.6,186.9-161.3,186.9-162.2z"/>
                    </g>
                    <g>
                        <path class="st3" d="M85-134.5c-3.2-4.7,1-10.7-1.4-15.2s-6.7-5-9.9-2.6c-3.6,2.8-3.4,6.6-8.3,8.8c-5.5,2.5-18-2.3-19.7,7.3
                            c-0.9,4.8,2.4,8.6,7.3,9.7c6.1,1.4,9.3,0.2,15.4,3.1c6.1,2.9,11.2,9,22.1,12.1c10.4,3,16.1-1.6,16.6-5.9
                            C108.2-125.7,90-127.2,85-134.5z M82.8-127.1c0,1.2-1,2.3-2.3,2.3s-2.3-1-2.3-2.3s1-2.3,2.3-2.3
                            C81.8-129.3,82.8-128.3,82.8-127.1z"/>
                        <path class="st2" d="M112-173.7c0-17.2-14.5-25.5-27-22.8c-10.3,2.2-12.8,17.3-16.7,26.2c-3.7,8.6-8.8,22.5-20.2,22.5
                            c-11.2,0-12.8-14.5-23.7-14.5c-11,0-24.5,15.7-24.5,39.7C0-108,9.8-91.2,20.8-92c11.7-0.8,4.5-19.7,15.3-19.7
                            c9.5,0,7.9,16.3,9.2,23.3c1.7,9,6.8,14.2,18.5,13.2c14.4-1.2,22.3-13.5,18.9-23.3c-4-11.4-23.9-17.3-21.5-30.5
                            c1.3-7.6,13-12,26-16.2C101.7-149.9,112-156.5,112-173.7z M67.1-97.9c0-1.8,1.5-3.3,3.3-3.3c1.8,0,3.3,1.5,3.3,3.3
                            s-1.5,3.3-3.3,3.3C68.5-94.6,67.1-96,67.1-97.9z M20.4-122.8c0,1-0.8,1.7-1.7,1.7s-1.7-0.8-1.7-1.7c0-1,0.8-1.7,1.7-1.7
                            S20.4-123.7,20.4-122.8z M37.8-133.5c0,2.1-1.7,3.8-3.8,3.8c-2.1,0-3.8-1.7-3.8-3.8s1.7-3.8,3.8-3.8
                            C36.1-137.3,37.8-135.6,37.8-133.5z M57.7-117.9c0,0.9-0.7,1.6-1.6,1.6s-1.6-0.7-1.6-1.6s0.7-1.6,1.6-1.6S57.7-118.8,57.7-117.9
                            z M87.4-172.6c0,1.8-1.4,3.2-3.2,3.2s-3.2-1.4-3.2-3.2s1.4-3.2,3.2-3.2C85.9-175.8,87.4-174.4,87.4-172.6z"/>
                        <path class="st2" d="M109.2-153.5c0,8.4-5.1,15.2-11.3,15.2s-11.3-6.8-11.3-15.2c0-8.4,5.1-12.4,11.3-12.4
                            S109.2-161.9,109.2-153.5z"/>
                    </g>
                </g>
            </g>
        </pattern>
        <rect class="st4" width="150" height="50"/>
        <text transform="matrix(1.0836 0.1762 -0.1946 0.9809 106.7336 41.3422)" class="st5 st6 st7">${c5}</text>
        <text transform="matrix(0.9782 0.2012 -0.2009 0.9796 87.9093 27.0004)" class="st8 st6 st9">${c4}</text>
        <text transform="matrix(0.9525 -0.3046 0.3046 0.9525 62.563 46.3248)" class="st10 st6 st11">${c3}</text>
        <text transform="matrix(0.9999 -1.290022e-02 1.290022e-02 0.9999 35.6813 44.4384)" class="st12 st6 st13">${c2}</text>
        <text transform="matrix(0.958 -0.2868 0.2868 0.958 3.9246 47.6292)" class="st14 st6 st15">${c1}</text>
        <pattern  id="SVGID_1_" xlink:href="#Alyssa" patternTransform="matrix(1 0 0 -1 -99.96 -17007.0098)">
        </pattern>
        <polygon class="st16" points="143.9,35.4 7.6,28.6 7.6,27.6 143.9,34.4 "/>
        <pattern  id="SVGID_2_" xlink:href="#Alyssa" patternTransform="matrix(1 0 0 -1 -99.96 -17007.0098)">
        </pattern>
        <polygon class="st17" points="141.9,13.7 5.5,22.3 5.4,21.3 141.8,12.7 "/>
        </svg>
        `;
    }

    // Initial CAPTCHA generation
    useEffect(() => {
        createCaptcha();
    }, [])


  return (
    <div id='captcha' style={{width:'150px'}}></div>
  )
}

export default Captcha