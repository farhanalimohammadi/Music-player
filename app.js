const X = document
const mainPege = X.getElementById("lets-start")
const allContent = X.getElementById("all")
const welcomePege = X.getElementById('welcome')
mainPege.addEventListener("click" , function(){
    allContent.style.display = "flex"
    welcomePege.style.display = "none"
})
const musicData = [
    {
        name : "Scriptonite" ,
        article : "the god rap" ,
        img: "music-1" ,
        src: "music-1"
    },
    {
        name : "moo sharabi" ,
        article : "mehrab" ,
        img: "music-2" ,
        src: "music-2"
    },
    {
        name : "me and evil" ,
        article : "evil sign" ,
        img: "music-3" ,
        src: "music-3"
    },
    {
        name : "losing" ,
        article : "American bird" ,
        img: "music-4" ,
        src: "music-4"
    },
    {
        name : "Helia" ,
        article : "freedom love" ,
        img: "music-5" ,
        src: "music-5"
    },
    {
        name : "helaleeee" ,
        article : "ELA" ,
        img: "music-6" ,
        src: "music-6"
    }
]
const musicImg = X.getElementById("img")
const musicName = X.querySelector(".name")
const musicInfo = X.querySelector(".info")
const musicAudio = X.getElementById("music-Player")
const stopMusic = X.getElementById("stop")
const startMusic = X.getElementById("start")
const prevBtn = X.getElementById("previus")
const nextBtn = X.getElementById("next")
const timeLine = X.getElementById("time-line")
const musicTime = X.querySelector(".main-time")
const pastTime = X.querySelector(".time-past")
const progressBar = X.querySelector(".time-line")
let skip = X.getElementById("skip-icon")

let musicList = X.getElementById("list")
const listButton = X.getElementById("list-icon")
const closeListButton = X.getElementById("close-list")
let musicIndex = 2 ;
window.addEventListener("load" , ()=>{
    loadMusic(musicIndex)
})
function playMusic(){
    musicAudio.play()
    startMusic.style.display = "none"
    stopMusic.style.display = "inline"
}
function pausedMusic(){
    musicAudio.pause()
    startMusic.style.display = "inline"
    stopMusic.style.display = "none"
}
function nextMusic(){
    if (musicIndex === 6){
        musicIndex = 1
    }else{
        musicIndex = musicIndex + 1
    }
    loadMusic(musicIndex)
    playMusic()
}
startMusic.addEventListener("click" , function(){
    playMusic()
})
stopMusic.addEventListener("click" , function(){
    pausedMusic()
})

prevBtn.addEventListener("click" , function(){
    let getClass = skip.getAttribute("class")
    switch(getClass){
        case "fa fa-repeat":
            if (musicIndex === 1){
                musicIndex = 6
            }else{
                musicIndex = musicIndex - 1
            }
            loadMusic(musicIndex)
            playMusic()
            break;
        case "fa fa-retweet":
            if (musicIndex === 1){
                musicIndex = 6
            }else{
                musicIndex = musicIndex - 1
            }
            loadMusic(musicIndex)
            playMusic()
            break;
        case "fa fa-random":
            randIndex = Math.floor((Math.random() * musicData.length) + 1)
            do{
                randIndex = Math.floor((Math.random() * musicData.length) + 1)
            }while(musicIndex === randIndex)
                musicIndex = randIndex
                loadMusic(musicIndex)
                playMusic()
    }
    
})
nextBtn.addEventListener("click" , function(){
    let getClass = skip.getAttribute("class")
    switch(getClass){
        case "fa fa-repeat":
            if (musicIndex === 6){
                musicIndex = 1
            }else{
                musicIndex = musicIndex + 1
            }
            loadMusic(musicIndex)
            playMusic()
            break;
        case "fa fa-retweet":
            if (musicIndex === 6){
                musicIndex = 1
            }else{
                musicIndex = musicIndex + 1
            }
            loadMusic(musicIndex)
            playMusic()
            break;
        case "fa fa-random":
            randIndex = Math.floor((Math.random() * musicData.length) + 1)
            do{
                randIndex = Math.floor((Math.random() * musicData.length) + 1)
            }while(musicIndex === randIndex)
                musicIndex = randIndex
                loadMusic(musicIndex)
                playMusic()
    }
    
})
musicAudio.addEventListener("timeupdate" , (e)=>{
    const currentTime = e.target.currentTime
    const durationTime = e.target.duration
    const presentTime = currentTime / durationTime * 100
    timeLine.style.width = `${presentTime}%`

    musicAudio.addEventListener("loadeddata" , (e)=>{
        let duration = Math.floor(musicAudio.duration / 60)
        let totalSec = Math.floor(musicAudio.duration % 60)
        if (totalSec < 10){
            totalSec = `0${totalSec}`;
        }
        musicTime.innerHTML = `${duration}:${totalSec}`
    })
        let currentMin = Math.floor(musicAudio.currentTime / 60)
        let currentSec = Math.floor(musicAudio.currentTime % 60)
        if (currentSec < 10){
            currentSec = `0${currentSec}`;
        }
        pastTime.innerHTML = `${currentMin}:${currentSec}`
        
        let nameForListLong = musicAudio.src
        let nameforList = nameForListLong.slice(74 , nameForListLong.length)
        if(nameforList === "music-2.mp3"){
            let li2 = musicList.querySelector(".music-2")
            li2.classList.remove("li-list")
            li2.classList.add("li-list-2")
        }
        
})
progressBar.addEventListener("click" , (e)=>{
    let progressBarWidthval = progressBar.clientWidth
    let clickedOffsetX = e.offsetX
    let songDuration = musicAudio.duration
    musicAudio.currentTime = (clickedOffsetX / progressBarWidthval) * songDuration
    playMusic()
})

skip.addEventListener("click" , ()=>{
    let getClass = skip.getAttribute("class")
    switch(getClass){
        case "fa fa-repeat":
            skip.classList.remove("fa")
            skip.classList.remove("fa-repeat")
            skip.className = "fa fa-retweet"
            skip.setAttribute("title" , "song looped")
            skip.innerHTML = "<span class='one'>1</span>"
            break;
        case "fa fa-retweet":
            skip.classList.remove("fa")
            skip.classList.remove("fa-retweet")
            skip.className = "fa fa-random"
            skip.setAttribute("title" , "playback shuffle")
            skip.innerHTML = ""
            break;
        case "fa fa-random":
            skip.classList.remove("fa")
            skip.classList.remove("fa-random")
            skip.className = "fa fa-repeat"
            skip.setAttribute("title" , "playlist looped")
            skip.innerHTML = ""
            break;
    }
})

musicAudio.addEventListener("ended" , ()=>{
    let getClass = skip.getAttribute("class")
    switch(getClass){
        case "fa fa-repeat":
            nextMusic()
            break;
        case "fa fa-retweet":
            musicAudio.currentTime = 0
            loadMusic(musicIndex)
            playMusic()
            break;
        case "fa fa-random":
            randIndex = Math.floor((Math.random() * musicData.length) + 1)
            do{
                randIndex = Math.floor((Math.random() * musicData.length) + 1)
            }while(musicIndex === randIndex)
                musicIndex = randIndex
                loadMusic(musicIndex)
                playMusic()
            break;
    }
})
listButton.addEventListener("click" , ()=>{
    musicList.style.height = "360px"
    musicList.style.opacity = "0.8"
})
closeListButton.addEventListener("click" , ()=>{
    musicList.style.height = "0px"
    musicList.style.opacity = "0"
})
function musicNameList(){
    musicData.forEach(function(elem){
        let newLiElem = document.createElement("li")
        newLiElem.className = "li-list" + " " + elem.src
        let newH4Elem = document.createElement("h4")
        newH4Elem.innerHTML = elem.name
        let newPElem = document.createElement("p")
        newPElem.innerHTML = elem.article
        newLiElem.append(newH4Elem , newPElem)
        musicList.append(newLiElem)
    })
}
musicNameList()


function loadMusic(indexNumb){
    musicName.innerHTML = musicData[indexNumb - 1].name;
    musicInfo.innerHTML = musicData[indexNumb - 1].article;
    musicImg.src = `image/${musicData[indexNumb - 1].img}.jpg` ;
    musicAudio.src = `Audio/${musicData[indexNumb - 1].src}.mp3` ;
}
