const BASE_URL="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdown=document.querySelectorAll(".dropdown select")
const btn=document.querySelector("form button")
const fromCurr=document.querySelector(".from select")
const toCurr=document.querySelector(".to select")
const msg=document.querySelector(".msg")
const change=document.querySelector(".fa-solid")

window.addEventListener("load",()=>{
    updateExchangeRate()
})

for (let select of dropdown) {
    for (currCode in countryList) {
       let newOption=document.createElement("option")
       newOption.innerText=currCode;
       newOption.value=currCode;
       if(select.name==="from" && currCode==="USD"){
        newOption.selected="selected"
       }
       else if(select.name==="to" && currCode==="PKR"){
        newOption.selected="selected"
       }
       select.append(newOption);
    }
    select.addEventListener("change",(evt) => {
      updateFlag(evt.target)
    })
}
const updateFlag=(element) => {
  let currCode=element.value
  let countryCode=countryList[currCode]
  let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
  let newImg= element.parentElement.querySelector("img")
  newImg.src=newSrc
}

btn.addEventListener("click",(event) => {
  event.preventDefault()  //page will not refresh automatically
  updateExchangeRate()
})
const updateExchangeRate=async ()=>{
    let amount=document.querySelector(".amount input")
  let amVal=amount.value
  if(amVal==="" || amVal<1){
    amVal=1
    amount.value=1
  }
//   console.log(fromCurr,toCurr)
  const URL=`${BASE_URL}/${fromCurr.value.toLowerCase()}.json`

  let response=await fetch(URL)
  let data=await response.json()
  let rate=data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()]
  console.log(rate)
  let finalRate=amVal*rate
  msg.innerText=`${amVal} ${fromCurr.value} = ${Math.floor(finalRate*100)/100} ${toCurr.value}`
}


