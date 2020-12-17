---
title: Reverse DNS in the Browser using DOH 
date: 2020-11-24
---

<input id="ip" placeholder="IP here"><br>
<button id="run">Run Reverse DNS</button>

<h4 id="hostnames"></h4>

### How?

Whereas previously I would have had to setup some type of translation server or REST API to take an IP and return its reverse DNS to the client, this is done using the magic of [DNS-over-HTTPS](https://en.wikipedia.org/wiki/DNS_over_HTTPS) (DoH).
Due to the fact that more and more DNS services are adding support for DoH, programmers can now make DNS requests from the browser assuming that the DoH server has Cross-origin resource sharing (CORS).
Thankfully the amazing [1.1.1.1](https://1.1.1.1) DNS server offered by [Cloudflare](https://cloudflare.com) has the CORS header set so it can be used client-side.
This site then takes the IP address and converts it into the corresponding in-addr.arpa for IPv4 addresses or ip6.arpa domain for IPv6 addresses and asks 1.1.1.1 for a PTR record for that domain.
For more about this process I suggest you read the Wikipedia page [here](https://en.wikipedia.org/wiki/Reverse_DNS_lookup).

<script>

window.onload = function() {

    function reverseDNS(ip) {
        eHostnames.innerHTML = "Loading";
        let reversedIP = "";
        let ip6 = false;

        if (ip.indexOf(":") == -1) {
            reversedIP = ip.split(".").reverse().join(".");
        } else {
            ip6 = true;
            let inflate = [];
            ip.split(":").forEach(x => x != '' ? inflate.push('0'.repeat(4 - x.length) + x) : inflate.push(''));
            let zeroes = 0;
            inflate.forEach(x => zeroes += x.length);
            let final = "";
            inflate.forEach(x => x == '' ? final += ('0'.repeat(32 - zeroes)) : final += x);
            reversedIP = final.split('').reverse().join(".");
        }

        fetch(`https://mozzila.cloudflare-dns.com/dns-query?name=${reversedIP}.${ip6?"ip6":"in-addr"}.arpa&type=PTR`, {
                method: 'GET',
                headers: new Headers({
                    'accept': 'application/dns-json'
                })
            }).then((res) => {
                return res.json()
            }).then(({
                Answer
            }) => {
                if (Answer == undefined) {
                    eHostnames.innerHTML = `${ip} does not have a PTR record`;
                    return;
                }
                let hostnames = Answer.map((item) => {
                    return item.data;
                });

                eHostnames.innerHTML = hostnames.join(", ");
            })
            .catch((err) => {
                console.log(err);
                eHostnames.innerHTML = "An error has occured, this could mean your network blocks https://mozzila.cloudflare-dns.com";
            })
    }

    let eHostnames = document.getElementById("hostnames");
    let eRun = document.getElementById("run");
    let eIP = document.getElementById("ip");

    eRun.addEventListener("click", () => {
        reverseDNS(eIP.value);
    })
}

</script>
