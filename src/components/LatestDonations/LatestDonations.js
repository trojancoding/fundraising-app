import './LatestDonations.scss';
import logo from '../../assets/logo.svg';
import React, { useState, useEffect, useRef } from 'react';

function useInterval(callback, delay) {
    const savedCallback = useRef();

    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Run first time without waiting.
    useEffect(() => {
        callback(true);
    }, []);

    //Set up the interval.
    useEffect(() => {
        function tick() {
            savedCallback.current();
        }
        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}
function timeSince(date) {

    var seconds = Math.floor((new Date() - date) / 1000);
  
    var interval = seconds / 31536000;
  
    if (interval > 1) {
        return Math.floor(interval)>1 ? Math.floor(interval) + " years" : Math.floor(interval) + " year";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
        return Math.floor(interval)>1 ? Math.floor(interval) + " months" : Math.floor(interval) + " month";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval)>1 ? Math.floor(interval) + " days" : Math.floor(interval) + " day";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval)>1 ? Math.floor(interval) + " hours" : Math.floor(interval) + " hour";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval)>1 ? Math.floor(interval) + " minutes" : Math.floor(interval) + " minute";
    }
    return Math.floor(seconds)>1 ? Math.floor(seconds) + " seconds" : Math.floor(seconds) + " second";
  }

function LatestDonations(props) {

    const latestDonationsDonations = useRef(null);
    const [seeAllToggled, setSeeAllToggled] = useState(false);

    const latestDonations = props.latestDonations;
    const setLatestDonations = props.setLatestDonations;
    const latestDonationsDataFetchInterval = props.latestDonationsDataFetchInterval;
    const [latestDonationsInHtml, setLatestDonationsInHtml] = useState([]);

    const getLatestDonationsDataUrl = props.getLatestDonationsDataUrl;
    const donationPath = props.donationPath;


    function getLastFakeDonations() {
        const fakeNames = [
            "Anonymous",
            "Anonymous",
            "Anonymous",
            "John Doe",
            "Jane Doe",
            "Bob Smith",
            "Alice Johnson",
            "Mike Brown",
            "Emily Davis",
            "David Wilson",
            "Sarah Clark",
            "James Lee",
            "Laura Perez"
        ];
        const currencies = ["$", "€","£","¥"]

        var lastDonations = latestDonations;
        if (Math.floor(Math.random() * 3) === 0) {
            lastDonations.push({
                // String of donor name
                donorName: fakeNames[Math.floor(Math.random() * fakeNames.length)],
                // donation amount number
                donationAmount: Math.floor(Math.random() * 200) + 1,
                // string of donation currency that is shown before donation amount
                donationCurrency: currencies[Math.floor(Math.random() * currencies.length)],
                // unix timestamp of the donation
                donationTimestamp: Math.floor(Math.random() * 186400000) + 1,
            })
        }
        return lastDonations;
    }

    const handleLatestDonationsChange = (clear) =>{
        const latestDonationsHeaderElement = document.getElementById('LatestDonations-donations');
        if(clear){
            latestDonationsHeaderElement.innerHTML = "";
        }
        var newDonations = latestDonations.filter(function(el) {
            return !(latestDonationsInHtml.some(e => e.donorName === el.donorName && e.donationTimestamp === el.donationTimestamp
                && e.donationCurrency === el.donationCurrency && e.donationAmount === el.donationAmount));
        });
        for (let idx = 0; idx < newDonations.length; idx++) {
            const donation = newDonations[idx];
            if(latestDonationsInHtml.length > 0 || idx > 0){
                latestDonationsHeaderElement.insertAdjacentHTML(
                    "afterbegin",
                    `
                    <div class='separator'></div>
                    `
                )
            }
            latestDonationsHeaderElement.insertAdjacentHTML(
                "afterbegin",
                `
                <div class='latest-donation-container'>
                <div class='latest-donation-value'>${donation.donationCurrency}${donation.donationAmount}</div>
                <div class='latest-donation-details'>
                    <p class='latest-donation-donor'>${donation.donorName}</p>
                    <p class='inline-separator'>●</p>
                    <p class='latest-donation-date'>${timeSince(new Date(Date.now()-donation.donationTimestamp))} ago</p>
                </div>
                </div>
                `
            )
        }
        const newLatestDonationsInHtml = latestDonationsInHtml.concat(newDonations);
        setLatestDonationsInHtml(newLatestDonationsInHtml);
    }

    useInterval(async (clear) => {
        // Fetch donations data here
        try {
            if(getLatestDonationsDataUrl != null){
                const response = await fetch(getLatestDonationsDataUrl + "?" + new URLSearchParams({
                    donationPath: donationPath,
                }));
                const responseJson = await response.json();
                setLatestDonations(responseJson);
            }else{
                const responseJson = await getLastFakeDonations();
                setLatestDonations(responseJson);
            }
            handleLatestDonationsChange(clear);
        } catch (error) {
            console.log("Something went wrong while trying to get latest donations data.")
        }

    }, latestDonationsDataFetchInterval);

    const handleSeeAllBtnClick = (e) => {
        setSeeAllToggled(!seeAllToggled);
        latestDonationsDonations.current.classList.toggle('more');
        latestDonationsDonations.current.scrollTop = 0;
        // latestDonationsDonations.current.scrollTo(0, 0);
    }

    return (
        <div className='LatestDonations-container'>
            <h3 id='latestDonationsHeader'>Latest donations</h3>
            {latestDonationsInHtml.length === 0 &&
                    <div class='latest-donation-container'>
                    <div class='latest-donation-value'></div>
                    <div class='latest-donation-details'>
                        <p class='inline-separator'>●</p>
                        <p class='latest-donation-donor'>Be the first one to donate!</p>
                        <p class='inline-separator'>●</p>
                        <p class='latest-donation-date'></p>
                    </div>
                    </div>
            }
            <div className='LatestDonations-donations' id="LatestDonations-donations" ref={latestDonationsDonations}>

            </div>

            {latestDonationsInHtml.length > 4 &&
            <button className='see-all-button' onClick={handleSeeAllBtnClick}>{seeAllToggled ? "Show Less" : "See All"}</button>
}
        </div>
    );
}

export default LatestDonations;
