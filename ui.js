class UI{
    constructor(){
        const showIP = document.getElementById('showIP');
        let entityArray=[];
        let eventsOutput='';
        let entryOutput='';
        let entityOutput='';
        //let getEntityList='';
        let singleEntityValue='';
    }
    
    displayASN(message){

        const div = document.createElement('div');
        div.className = 'col-5';
        const container = document.querySelector('.displayIP');
        const beforeThis = document.querySelector('#shopIP');
        container.appendChild(document.createTextNode(message));
        container.insertBefore(div.beforeThis);
        
    }
 
    // for Entries List recursive
     
    getEntityList(entities){
       console.log(entities);
       //this.singleEntityValue +="i am";
       this.entityArray=[];
       entities.forEach(element => {
         
         let {events: eEvents,handle,links: eLinks,objectClassName,port43,roles,vcardArray,entities: r_entities}=element;
        //  // for event list
        //   if(eEvents != undefined){
        //     this.eventsOutput =''; 
        //     eEvents.forEach(event => {
        //             // Destructure the single event
        //             let {eventAction,eventDate}=event;
        //             this.eventsOutput += '<b>' + eventAction + '</b><br>'+ eventDate + '<br><br>';
        //       });
        //   }

          // for port43
          if(port43 == undefined){
            port43 ='Port43 not available';   
          }

          // for handle
          if(handle == undefined){
            handle ='Handle isnot available';   
          }

          //    // for link list
          // if(eLinks != undefined){
          //   let linksOutput =''; 
          //   eLinks.forEach(link => {
          //           // Destructure the single link
          //         let {href:ehref,rel: erel,type: etype,value: evalue}=link;
          //         linksOutput += `<b>href: </b>${ehref}<br><b>rel: </b>${erel}<br><b>type: </b> ${etype}<br><b>value: </b>${evalue}<br><br>`;
          //     });
          //  }

            this.singleEntityValue += `<b>${handle}</b><br>${port43}<br><br><b>::Event List::</b><br><br><b>::Link List::</b><br><hr>`;
          if(r_entities != 'undefined' && r_entities != null){
              //console.log(r_entities+'i am un');
              this.getEntityList(r_entities);
          }
          //this.entityArray.push(singleEntityValue);
          this.entityArray.push(this.singleEntityValue);
       });
      //  console.log(this.entityArray);
      //return this.entityArray;
      return this.singleEntityValue; 
    }

    displayResult(res){
       
       console.log(res);
       let dnsOutput='';
       
        // ajv validator. rules for the domains status 
        // var ajv = new Ajv(); // options can be passed, e.g. {allErrors: true}
        // var schemaforIPv4IPv6ASNDomain = {
        //     "anyOf": [
        //         {
        //             "type": "string",
        //             "pattern": "^((?:(?:(?:\\w[\\.\\-\\+]?)*)\\w)+)((?:(?:(?:\\w[\\.\\-\\+]?){0,62})\\w)+)\\.(\\w{2,6})$",
        //             "errorMessage": 'should be domain' 
        //         },
        //         {
        //             "type": "string",
        //             "pattern": "^([1-5]\\d{4}|[1-9]\\d{0,3}|6[0-4]\\d{3}|65[0-4]\\d{2}|655[0-2]\\d|6553[0-5])(\\.([1-5]\\d{4}|[1-9]\\d{0,3}|6[0-4]\\d{3}|65[0-4]\\d{2}|655[0-2]\\d|6553[0-5]|0))?$",
        //             "errorMessage": 'should be sub domain'
        //         },
        //         {
        //             "type": "string",
        //             "format": "ipv6"
        //         },
        //         {
        //             "type": "string",
        //             "format": "ipv4"
        //         }
        //     ]
        // };
        // var schemaForRegCheck ={
        //   "type": "number",
        //   "minimum": 10,
        //   "errorMessage": 'this is a custom error messages'
        // }
        // close ajv validator and rules or policy

        // destructuring the res object
        let {arin_originas0_originautnums,country,cidr0_cidrs,endAddress,entities,events,remarks,handle,ipVersion,links,name,notices,objectClassName,nameservers,ldhName,parentHandle,port43,rdapConformance,startAddress,status,type} = res;
      //  let {entities,events,handle,links,notices,objectClassName,ldhName,nameservers,status} = res;
        
        // for objectClassName
        if(objectClassName == undefined){
          objectClassName='Not available';
        }

        // for ldhName
        if(ldhName == undefined){
          ldhName='Not available';
        }

        

        // for objectClassName
        if(objectClassName == undefined){
          objectClassName='Not available';
        }

        // for dns information of a domain
        if(nameservers!='' && nameservers!=undefined){
             
          dnsOutput='<dt class="col-sm-3">DNS Records</dt><dd class="col-sm-9">';
          nameservers.forEach(element => {
            
            // destructure the nsrecords

            let {ldhName} = element;
                dnsOutput += `${ldhName}<br>`;
               // console.log(rawText);
          });

          dnsOutput +='</dd>';
        } 

        let ip = document.getElementById('txtIP').value;
            

        let noticeOutput,eventsOutput,linksOutput,entityOutput,mainEventsOutput,mainLinksOutput,arinASNOutput,blocksOutput,statusesOutput,remarkOutput;
        noticeOutput=eventsOutput=linksOutput=entityOutput=mainEventsOutput=mainLinksOutput=arinASNOutput=blocksOutput=statusesOutput=remarkOutput='Not available';

        // for ASN number
        if(arin_originas0_originautnums != undefined){
          arinASNOutput='';
          arin_originas0_originautnums.forEach(element => {
            arinASNOutput +=element+"<br>";     
          });
        }
        
        // for country
        if(country == undefined){
          country='Not available';
        }

        // for parent Handle
        if(parentHandle == undefined){
          parentHandle='Not available';
        }
        
        // for Statuses
        if(status != undefined){
          statusesOutput='';
          status.forEach(element => {
            statusesOutput += element + '<br>';
          });
        }

        // for block information
       if(cidr0_cidrs != undefined){
          blocksOutput='';
          cidr0_cidrs.forEach(element => {
            blocksOutput += element.v4prefix + '/' + element.length;
          });
       }
        
       // for main event list
       if(events != undefined){
        mainEventsOutput =''; 
          events.forEach(element => {
                // Destructure the single event
                let {eventAction,eventDate}=element;
                
                
                if(eventAction === "registration"){
                    // check the registration tenure
                    let now = new Date();
                    let date = new Date( Date.parse(eventDate) );
                    let difference = now - date ;
                    let reglength = (difference * 0.00000000038) / 12;
                    
                    // if the registration is less then two years the toolbar icon will be change
                    if(reglength > 2){
                      // chrome.tabs.getSelected(null,function(tab) {
                      //       // to change the icon
                      //       chrome.browserAction.setIcon({tabId: tab.id,path:"img/green-isif.png"});    
                      //   })  
                    }
                }

                
                mainEventsOutput += '<b>' + eventAction + '</b><br>'+ eventDate + '<br>';
          });
        }


       // for main link list
       if(links != undefined){
          mainLinksOutput='';  
          links.forEach(element => {
            // Destructure the single link
            let {href,rel,type,value}=element;
            
            // get the domain IP
            let valArray = value.split('/');
            ip = valArray[valArray.length-1];
            
            mainLinksOutput += `<b>href: </b>${href}<br><b>rel: </b>${rel}<br><b>type: </b> ${type}<br><b>value: </b>${value}<br><br>`;
          });
        }

      // for notice list
      if(notices != undefined){
        noticeOutput=''; 
        notices.forEach(element => {
          // Destructure the single notice
          let {title,description}=element;
          noticeOutput += `<b>${title}</b><br>${description}<br><br>`;
        });
      }

      // for remarks list
      if(remarks != undefined){
        remarkOutput=''; 
        remarks.forEach(element => {
          // Destructure the single remark
          let {title,description}=element;
          remarkOutput += `<b>${title}</b><br>${description}<br><br>`;
        });
      }

      // for entities list
      if(entities != undefined){
        entityOutput='';
        //entityOutput = this.getEntityList(entities); 
        let entityNumber=0;
        entities.forEach(element => {
          entityNumber++;
          entityOutput +="<b>Entity Number: "+entityNumber+"</b><br><br>";
          // Destructure the single entity
          let {events: eEvents,handle,links: eLinks,objectClassName,port43,roles,vcardArray}=element;
          
          // for event list
          if(eEvents != undefined){
            eventsOutput =''; 
            eEvents.forEach(event => {
                    // Destructure the single event
                    let {eventAction,eventDate}=event;
                                    
                    if(eventAction === "registration"){
                      let now = new Date();
                      let date = new Date( Date.parse(eventDate) );
                      let difference = now - date ;
                      let year = (difference * 0.00000000038) / 12;
                      //console.log(year);
                      //console.log(eventDate);
                      
                      // ajv validation
                      // var validate = ajv.compile(schemaForRegCheck);
                      // var checkData = year;
                      // var valid = validate(checkData);
                      // if (!valid) console.log(validate.errors);
                      // ajv validation close
                        // eventDate += " Date -"  + eventDate - today;
                    }
                    eventsOutput += '<b>' + eventAction + '</b><br>'+ eventDate + '<br><br>';
              });
          }

          // for event list
          if(port43 == undefined){
            port43 ='Port43 not available';   
          }

            // for link list
          if(eLinks != undefined){
            linksOutput =''; 
            eLinks.forEach(link => {
                    // Destructure the single link
                  let {href:ehref,rel: erel,type: etype,value: evalue}=link;
                  linksOutput += `<b>href: </b>${ehref}<br><b>rel: </b>${erel}<br><b>type: </b> ${etype}<br><b>value: </b>${evalue}<br><br>`;
              });
            }

          entityOutput += `<b>${handle}</b><br>${port43}<br><br><b>::Event List::</b><br>${eventsOutput}<br><b>::Link List::</b><br>${linksOutput}<hr>`;
        });
      }
        // <h3>Search Result</h3>
        // <div class="card bg-info text-white mt-2 mb-3">
        //     <div class="card-header">IP: ${ip} [${ipVersion}]</div>
        // </div>

    let output = `
        <div class="card bg-light mt-2 mb-3">
            <div class="card-header">Network Informations</div>
            <div class="card-body">

            
            <dl class="row">
            <dt class="col-sm-3">Object Name</dt>
            <dd class="col-sm-9">${objectClassName}</dd>
            <dt class="col-sm-3">LDH Name</dt>
            <dd class="col-sm-9">${ldhName}</dd>
            ${dnsOutput}
            <dt class="col-sm-3">Net Range</dt>
            <dd class="col-sm-9">${startAddress} - ${endAddress} </dd>

            <dt class="col-sm-3">ASN</dt>
            <dd class="col-sm-9">
            ${arinASNOutput}
            </dd>
             
            <dt class="col-sm-3">Netname</dt>
            <dd class="col-sm-9">${name}</dd>

            <dt class="col-sm-3 text-truncate">Country</dt>
            <dd class="col-sm-9">${country}</dd>

            <dt class="col-sm-3">Status</dt>
            <dd class="col-sm-9">${statusesOutput}</dd>

            <dt class="col-sm-3">Type</dt>
            <dd class="col-sm-9">${type}</dd>
            <dt class="col-sm-3">Block</dt>
            <dd class="col-sm-9">${blocksOutput}</dd>
            <dt class="col-sm-3">Handle</dt>
            <dd class="col-sm-9">${handle}</dd>
            <dt class="col-sm-3">Parent</dt>
            <dd class="col-sm-9">${parentHandle}</dd>
            
            <dt class="col-sm-3">Port 43 Whois</dt>
            <dd class="col-sm-9">${port43}</dd>
            <dt class="col-sm-3">Events</dt>
            <dd class="col-sm-9">${mainEventsOutput}</dd>
            <dt class="col-sm-3">Links</dt>
            <dd class="col-sm-9">${mainLinksOutput}</dd>
            <dt class="col-sm-3">Notices</dt>
            <dd class="col-sm-9">${noticeOutput}</dd>
            <dt class="col-sm-3">Remarks</dt>
            <dd class="col-sm-9">${remarkOutput}</dd>
            <dt class="col-sm-3">Entities</dt>
            <dd class="col-sm-9">${entityOutput}</dd>
          </dl>
                      
        </div>
         `;

        document.getElementById('result').innerHTML=output;
    }

    displayASNResult(res){
        //console.log(res);
        
        // destructuring the res object
        let {abuse_contacts,asn,country_code,date_updated,description_full,description_short,email_contacts,iana_assignment,looking_glass,name,owner_address,rir_allocation
        ,traffic_estimation,traffic_ratio,website} = res;
        
        // destructuring the iana assignment object
        let {assignment_status,date_assigned,description,whois_server}= iana_assignment;
        
        // destructuring the rir allocation object
        let {allocation_status,country_code: rir_country,date_allocated,rir_name}=rir_allocation;
        
        let description_fullDisplay="";
        description_full.forEach(element => {
          description_fullDisplay +=element+"<br>";                  
        });
        
        let email_contactsDisplay="";
        email_contacts.forEach(element => {
          email_contactsDisplay +=element+"<br>";
                  
        });
        let abuse_contactsDisplay="";
        abuse_contacts.forEach(element => {
          abuse_contactsDisplay +=element+"<br>";          
        });
        
        let owner_addressDisplay="";
        owner_address.forEach(element => {
          owner_addressDisplay +=element+"<br>";                  
        });
        
        
        // validation
        let now = new Date();
        let testValue="this is test one. you can omit it";
        let date = new Date( Date.parse(date_allocated) );
        let difference = now - date ;
        let year = (difference * 0.00000000038) / 12;
        console.log(year);
         
         


        //  <h3>Search Result</h3>
        // <div class="card bg-info text-white mt-2 mb-3">
        //     <div class="card-header">ASN: ${asn}</div>
        // </div>
        let output =
        `       
        <div class="card bg-light mt-2 mb-3">
            <div class="card-header">Network Informations</div>
            <div class="card-body">
                             
              <dl class="row">
                <dt class="col-sm-3">Name</dt>
                <dd class="col-sm-9">${name}</dd>

                <dt class="col-sm-3">Short Description</dt>
                <dd class="col-sm-9">
                     ${description_short}
                </dd>

                <dt class="col-sm-3">Full Description</dt>
                <dd class="col-sm-9">${description_fullDisplay}</dd>

                <dt class="col-sm-3 text-truncate">Country Code</dt>
                <dd class="col-sm-9">${country_code}</dd>

                <dt class="col-sm-3">Website</dt>
                <dd class="col-sm-9">${website}</dd>

                <dt class="col-sm-3">Email Contact</dt>
                <dd class="col-sm-9">${email_contactsDisplay}</dd>
                <dt class="col-sm-3">Abuse Contacts</dt>
                <dd class="col-sm-9">${abuse_contactsDisplay}</dd>
                <dt class="col-sm-3">Looking Glass</dt>
                <dd class="col-sm-9">${looking_glass}</dd>
                <dt class="col-sm-3">Traffic Estimation</dt>
                <dd class="col-sm-9">${traffic_estimation}</dd>
                <dt class="col-sm-3">Traffic Ratio</dt>
                <dd class="col-sm-9">${traffic_ratio}</dd>
                <dt class="col-sm-3">Owner Address</dt>
                <dd class="col-sm-9">${owner_addressDisplay}</dd>
                <dt class="col-sm-3">Updated Date</dt>
                <dd class="col-sm-9">${date_updated}</dd>
                <dt class="col-sm-3">IANA Assignment</dt>
                <dd class="col-sm-9">
                   <dl class="row">
                      <dt class="col-sm-4">Status</dt>
                      <dd class="col-sm-8">${assignment_status}</dd>
                   </dl>
                   <dl class="row">
                      <dt class="col-sm-4">Assign Date</dt>
                      <dd class="col-sm-8">${date_assigned}</dd>
                   </dl>
                   <dl class="row">
                      <dt class="col-sm-4">Description</dt>
                      <dd class="col-sm-8">${description}</dd>
                   </dl>
                   <dl class="row">
                      <dt class="col-sm-4">Whois Server</dt>
                      <dd class="col-sm-8">${whois_server}</dd>
                   </dl>  
                </dd>
                <dt class="col-sm-3">RIR allocation</dt>
                <dd class="col-sm-9">
                   <dl class="row">
                      <dt class="col-sm-4">Status</dt>
                      <dd class="col-sm-8">${allocation_status}</dd>
                   </dl>
                   <dl class="row">
                      <dt class="col-sm-4">Country</dt>
                      <dd class="col-sm-8">${rir_country}</dd>
                   </dl>
                   <dl class="row">
                      <dt class="col-sm-4">Allocation Date</dt>
                      <dd class="col-sm-8">${date_allocated}</dd>
                   </dl>
                   <dl class="row">
                      <dt class="col-sm-4">RIR Name</dt>
                      <dd class="col-sm-8">${rir_name}</dd>
                   </dl>  
                </dd>
              </dl>
           </div>
        </div> 
        `;
        document.getElementById('result').innerHTML=output;
    }
}