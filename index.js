window.onload = function(){
    // initiatize the UI
    const ui = new UI;
    
    // get the url from the address bar
    // chrome.tabs.getSelected(null,function(tab) {
    //     var tablink = tab.url;
    //     $parseURL = new URL(tablink);
    //     $finalURL = $parseURL.hostname;
    //     console.log($finalURL);
        
    //     if($finalURL !== 'newtab'){
            
    //         // remove the subdomain
    //         var parsed = psl.parse($finalURL);
    //         $finalURL = parsed.domain;
    //         console.log(parsed.domain);

    //         document.getElementById("txtIP").value = $finalURL;
    //         document.getElementById("txtIP").focus();
    //         document.getElementById("ddOption").options[2].selected = true;
    
    //         // to change the icon
    //         // chrome.browserAction.setIcon({tabId: tab.id,path:"img/green-isif.png"});
    
    //         submitButton();    
    //     }            
    // });

    

    // execute this function when click the search button
    const submitButton = () => {
        // get the input value    
        let ip      = document.getElementById("txtIP").value;

                        
        // check the validity of ipv4 
        const checkValidIP = ip =>{
            let blocks = ip.split(".");
            if(blocks.length === 4) {
                return blocks.every(function(block) {
                return parseInt(block,10) >=0 && parseInt(block,10) <= 255;
                });
            }
            return false;
        }

        // check the vality of IPv6
        const checkValidIPV6 = ip =>{
            var re = new RegExp(/((^\s*((([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))\s*$)|(^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$))/); 
            return ip.match(re);
        }

        // check the vality of ASN
        const checkValidASN = ip =>{
            let reASN = new RegExp(/^([1-5]\d{4}|[1-9]\d{0,3}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])(\.([1-5]\d{4}|[1-9]\d{0,3}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5]|0))?$/);  
            return ip.match(reASN);
        }

        
    
        // check the valid domain name
        const checkValidDomain = _domain =>{
            var re = new RegExp(/^((?:(?:(?:\w[\.\-\+]?)*)\w)+)((?:(?:(?:\w[\.\-\+]?){0,62})\w)+)\.(\w{2,6})$/); 
            return _domain.match(re);
        }
        
        // check the valid name server
        const checkValidNameServer = _domain =>{
            var reNS = new RegExp(/^([a-zA-Z0-9]+|[a-zA-Z0-9]*\*[a-zA-Z0-9]*)(\.[a-zA-Z0-9]+){2,3}$/); 
            //var re = new RegExp(/^((?:(?:(?:\w[\.\-\+]?)*)\w)+)((?:(?:(?:\w[\.\-\+]?){0,62})\w)+)\.(\w{2,6})$/); 
            return _domain.match(reNS);
        }

        // fetch the ip address of a specific domain
        async function getIPofDomain(_domain){
            let response = await fetch('https://dns.google/resolve?name='+_domain);
            let json = await response.json();
            return json.Answer[0].data;
        }

        
        
        // fetch the rdap information of a specific ip
        async function getApiData(url){
            //console.log(url);
            const response = await fetch(url);
            const jsondata = await response.json();
            return jsondata;                    
        }

        // fetch the ASN by passing the IP address
        // async function getASN(ip){
        //     const response = await fetch(`https://ipapi.co/${ip}/json/`);
        //     const data = await response.json();
        //     return data.asn;    
        // }

        // fetch the network information by passing the ASN address
        async function getNetworkASN(asn){
            let res1 = asn.split(".");
            //console.log(res1);
            if(res1.length>1){
                asn = parseInt(res1[0]*65536)+parseInt(res1[1]);
            }else{
                asn = parseInt(res1[0]);
            }
            
            const response = await fetch(`https://api.bgpview.io/asn/${asn}`);
            const data = await response.json();
            return data.data;    
        }
        
        // fetch the nameserver of a domain
        async function getNameServer(_domain){
            const response = await fetch(`https://www.whoisxmlapi.com/whoisserver/DNSService?apiKey=at_kIEcsLxf9NAlDXcPdTXOXudneUApQ&domainName=${_domain}&type=2&outputFormat=JSON`);                
            const data = await response.json();
            return data;    
        }
            
        if(!ip == "")
        {
            const ipValidityStatus = checkValidIP(ip);
            const ip6ValidityStatus = checkValidIPV6(ip);
            let asn ='';
            if(ipValidityStatus || ip6ValidityStatus){
                // fetch the asn and display
                // getASN(ip)
                // .then(data=>{
                //         //ui.displayASN(data);
                //         asn = data; 
                // });
                //getApiData('https://rdap.db.ripe.net/ip/'+ip)
                getApiData('https://rdap.org/ip/'+ip)                
                .then(res => {
                    ui.displayResult(res);
                    })
                .catch(err => {
                        // ui.displayResult(err);
                        document.getElementById("result").innerHTML = err;
                })
            }else if(checkValidNameServer(ip)){
                // fetch the IP inforamtion by the domain IP
                getIPofDomain(ip)
                .then(res => {
                    // getASN(res)
                    // .then(data=>{
                    //     //console.log(data);
                    //     asn = data; 
                    // });
                    
                    //getApiData('https://rdap.db.ripe.net/ip/'+res)
                    getApiData('https://rdap.org/ip/'+res)
                    .then(res => {
                        //ui.displayResult(res,nsrecords);
                        ui.displayResult(res);
                        //console.log(nsrecords);
                        })
                    .catch(err => {
                        //ui.displayResult(res);
                        document.getElementById("result").innerHTML = err;
                    })
                })   

            }else if(checkValidDomain(ip)){
                
                // fetch the domain nameserver
                let nsrecords="";
                getNameServer(ip)
                    .then(res=>{
                        // this.console.log(res);
                        nsrecords = res.DNSData.dnsRecords; 
                       // this.console.log(nsrecords[0].additionalName);
                    });    
                
                // fetch the IP inforamtion by the domain IP
               // getIPofDomain(ip)
               // .then(res => {
                    // getASN(res)
                    // .then(data=>{
                    //     //console.log(data);
                    //     asn = data; 
                    // });
                    
                    //getApiData('https://rdap.db.ripe.net/ip/'+res)
                    getApiData('https://rdap.org/domain/'+ip)
                    .then(res => {
                        //ui.displayResult(res,nsrecords);
                        ui.displayResult(res);
                        console.log(nsrecords);
                        })
                    .catch(err => {
                        //ui.displayResult(res);
                        document.getElementById("result").innerHTML = err;
                    })                
              //  }) 
            }else if (checkValidASN(ip)){
                //getNetworkASN(ip)
                getApiData('https://rdap.org/autnum/'+ip)
                .then(res => {
                    //ui.displayASNResult(res);
                    ui.displayResult(res);
                    })
                .catch(err => {
                        // ui.displayResult(err);
                        document.getElementById("result").innerHTML = err;
                })

            }else{
                document.getElementById("result").innerHTML = "::Invalid ASN/Domain/IPv4/IPv6/Name Server/:: <br>Pls write the following ways:- <br><br>ASN - 54540 or 1.23 <br>Domain - google.com<br>IPv4 - 1.23.42.12 <br>IPv6 - 2402:1980:249:43e3:bd55:7d09:414c:31c2<br>Name Server - ns1.google.com<br>" + ip;
            }
    
        }
    }
    
    var input      = document.getElementById("txtIP");
    
    
    
    
    //let inputValue = document.getElementById("txtIP").value;
    input.addEventListener("keyup", function(event){
            let inputValue = input.value;
            console.log(inputValue);
            var reNS = new RegExp(/^([a-zA-Z0-9]+|[a-zA-Z0-9]*\*[a-zA-Z0-9]*)(\.[a-zA-Z0-9]+){2,3}$/);
            var reIPv4 = new RegExp(/^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/);
            var reDomain = new RegExp(/^((?:(?:(?:\w[\.\-\+]?)*)\w)+)((?:(?:(?:\w[\.\-\+]?){0,62})\w)+)\.(\w{2,6})$/);
            let reASN = new RegExp(/^([1-5]\d{4}|[1-9]\d{0,3}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])(\.([1-5]\d{4}|[1-9]\d{0,3}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5]|0))?$/); 
            let reIPv6 = new RegExp(/((^\s*((([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))\s*$)|(^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$))/);
            
            if(inputValue.match(reIPv4)){
                document.getElementById("ddOption").options[3].selected = true;
            }else if(inputValue.match(reIPv6)){
                document.getElementById("ddOption").options[4].selected = true;
            }else if(inputValue.match(reNS)){
                document.getElementById("ddOption").options[2].selected = false; 
                document.getElementById("ddOption").options[5].selected = true;
            }else if (inputValue.match(reDomain)){
                document.getElementById("ddOption").options[2].selected = true;
    
            }else if (inputValue.match(reASN)){
                document.getElementById("ddOption").options[1].selected = true;
            }else{
                document.getElementById("ddOption").options[0].selected = true;
            }
    
    
            if (event.keyCode === 13) {
                event.preventDefault();
                //console.log('i am in enter');
                submitButton();           
            }       
    }); 


    document.getElementById("btnSubmit").onclick=function(){
        submitButton();
    }
}