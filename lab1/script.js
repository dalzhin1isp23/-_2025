function shifr(){

let alphavit = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I','J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R','S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
let no_shifr=document.getElementById("ne_sh")
let obr_no_shifr=(no_shifr.value).toUpperCase()
let shifr=document.getElementById("sh")
let put_box=document.getElementById("put")
let put=[]
let post=""

for (let i=0;(no_shifr.value).length>i;i++){
    let flag=false
         for (let j=0;alphavit.length>j;j++){
            if (obr_no_shifr[i] == alphavit[j]){
                if(j+13 >= alphavit.length){
                    post+=""+alphavit[(j+13)-alphavit.length]
                    put.push(""+(i+1)+" "+obr_no_shifr[i]+" ⮕ "+alphavit[(j+13)-alphavit.length])
                    flag=true
                    
                }
                else{
                    post+=""+alphavit[j+13]
                    put.push(""+(i+1)+" "+obr_no_shifr[i]+" ⮕ "+alphavit[j+13])
                    flag=true
                }
            }
        }
        if (flag==false){
            post+=""+obr_no_shifr[i]
            put.push(""+(i+1)+" символ - '"+obr_no_shifr[i]+"'")
        }
       

}
put_box.innerHTML=""
shifr.innerHTML=""+post
for (let i=0;put.length>i;i++){
    put_box.innerHTML+=""+put[i]+"<br>"
}



}
