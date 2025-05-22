function shifr(){

    let alphavit = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I','J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R','S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    let alphavitLower = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i','j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r','s', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    
    let no_shifr = document.getElementById("ne_sh");
    let obr_no_shifr = no_shifr.value;
    let shifr = document.getElementById("sh");
    let put_box = document.getElementById("put");
    let put = [];
    let post = "";

    for (let i = 0; i < obr_no_shifr.length; i++) {
        let flag = false;

        for (let j = 0; j < alphavit.length; j++) {
            if (obr_no_shifr[i] === alphavit[j]) {
                if (j + 13 >= alphavit.length) {
                    post += alphavit[(j + 13) - alphavit.length];
                    put.push((i + 1) + " " + obr_no_shifr[i] + " ⮕ " + alphavit[(j + 13) - alphavit.length]);
                } else {
                    post += alphavit[j + 13];
                    put.push((i + 1) + " " + obr_no_shifr[i] + " ⮕ " + alphavit[j + 13]);
                }
                flag = true;
                break;
            }
        }

        if (!flag) {
            for (let j = 0; j < alphavitLower.length; j++) {
                if (obr_no_shifr[i] === alphavitLower[j]) {
                    if (j + 13 >= alphavitLower.length) {
                        post += alphavitLower[(j + 13) - alphavitLower.length];
                        put.push((i + 1) + " " + obr_no_shifr[i] + " ⮕ " + alphavitLower[(j + 13) - alphavitLower.length]);
                    } else {
                        post += alphavitLower[j + 13];
                        put.push((i + 1) + " " + obr_no_shifr[i] + " ⮕ " + alphavitLower[j + 13]);
                    }
                    flag = true;
                    break;
                }
            }
        }

        if (!flag) {
            post += obr_no_shifr[i];
            put.push((i + 1) + " символ - '" + obr_no_shifr[i] + "'");
        }
    }

    put_box.innerHTML = "";
    shifr.innerHTML = post;
    for (let i = 0; i < put.length; i++) {
        put_box.innerHTML += put[i] + "<br>";
    }
}

function alphavit() {
  alert(
    "A → N\n" +
    "B → O\n" +
    "C → P\n" +
    "D → Q\n" +
    "E → R\n" +
    "F → S\n" +
    "G → T\n" +
    "H → U\n" +
    "I → V\n" +
    "J → W\n" +
    "K → X\n" +
    "L → Y\n" +
    "M → Z\n" +
    "N → A\n" +
    "O → B\n" +
    "P → C\n" +
    "Q → D\n" +
    "R → E\n" +
    "S → F\n" +
    "T → G\n" +
    "U → H\n" +
    "V → I\n" +
    "W → J\n" +
    "X → K\n" +
    "Y → L\n" +
    "Z → M"
  );
}