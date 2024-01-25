
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
import { getAuth} from "https://www.gstatic.com/firebasejs/9.1.1/firebase-auth.js";

import { getFirestore,
    collection,
    addDoc,serverTimestamp,onSnapshot,orderBy,query,where, doc,
    updateDoc,deleteDoc} from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js";
const firebaseConfig = {
    apiKey: "AIzaSyBPfDZJjBgSzbdSApeO0471NmPiKj-SHo0",
    authDomain: "eduhelp-forum-885aa.firebaseapp.com",
    projectId: "eduhelp-forum-885aa",
    storageBucket: "eduhelp-forum-885aa.appspot.com",
 
  };
  const app = initializeApp(firebaseConfig)
  const auth = getAuth(app)
  const db = getFirestore(app)


const textareaEl = document.getElementById("post-input")
const postButtonEl = document.getElementById("post-btn")

const allFilterButtonEl = document.getElementById("all-filter-btn")

const filterButtonEls = document.getElementsByClassName("filter-btn")

const postsEl = document.getElementById("posts")
for (let filterButtonEl of filterButtonEls) {
    filterButtonEl.addEventListener("click", selectFilter)
}

postButtonEl.addEventListener("click", postButtonPressed)
const collectionName = "computer-science"
async function addPostToDB(postBody) {
    try {
        const docRef = await addDoc(collection(db, collectionName), {
            body: postBody,
           createdAt: serverTimestamp(),
          
        })
        console.log("Document written with ID: ", docRef.id)
    } catch (error) {
        console.error(error.message)
    }
}
async function updatePostInDB(docId, newBody) {
    const postRef = doc(db, collectionName, docId);

    await updateDoc(postRef, {
        body: newBody
    })
}
function fetchInRealtimeAndRenderPostsFromDB(query) {
    onSnapshot(query, (querySnapshot) => {
        clearAll(postsEl)
        
        querySnapshot.forEach((doc) => {
            renderPost(postsEl, doc)
        })
    })
}

function fetchTodayPosts() {
    const startOfDay = new Date()
    startOfDay.setHours(0, 0, 0, 0)
    
    const endOfDay = new Date()
    endOfDay.setHours(23, 59, 59, 999)
    
    const postsRef = collection(db, collectionName)
    
    const q = query(postsRef,
                              where("createdAt", ">=", startOfDay),
                              where("createdAt", "<=", endOfDay),
                              orderBy("createdAt", "desc"))
                              
    fetchInRealtimeAndRenderPostsFromDB(q)                  
}

function fetchWeekPosts() {
    const startOfWeek = new Date()
    startOfWeek.setHours(0, 0, 0, 0)
    
    if (startOfWeek.getDay() === 0) { // If today is Sunday
        startOfWeek.setDate(startOfWeek.getDate() - 6) // Go to previous Monday
    } else {
        startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay() + 1)
    }
    
    const endOfDay = new Date()
    endOfDay.setHours(23, 59, 59, 999)
    
    const postsRef = collection(db, collectionName)
    
    const q = query(postsRef,
                              where("createdAt", ">=", startOfWeek),
                              where("createdAt", "<=", endOfDay),
                              orderBy("createdAt", "desc"))
                              
    fetchInRealtimeAndRenderPostsFromDB(q)
}
async function deletePostFromDB(docId) {
    await deleteDoc(doc(db, collectionName, docId))
}

function fetchMonthPosts() {
    const startOfMonth = new Date()
    startOfMonth.setHours(0, 0, 0, 0)
    startOfMonth.setDate(1)

    const endOfDay = new Date()
    endOfDay.setHours(23, 59, 59, 999)

	const postsRef = collection(db, collectionName)
    
    const q = query(postsRef,
                              where("createdAt", ">=", startOfMonth),
                              where("createdAt", "<=", endOfDay),
                              orderBy("createdAt", "desc"))

    fetchInRealtimeAndRenderPostsFromDB(q)
}

function fetchAllPosts() {
    const postsRef = collection(db, collectionName)
    
    const q = query(postsRef, 
                              orderBy("createdAt", "desc"))

    fetchInRealtimeAndRenderPostsFromDB(q)
}

/* == Functions - UI Functions == */

function createPostHeader(postData) {
    /*
        <div class="header">
        </div>
    */
    const headerDiv = document.createElement("div")
    headerDiv.className = "header"
    
        /* 
            <h3>21 Sep 2023 - 14:35</h3>
        */
        const headerDate = document.createElement("h3")
        headerDate.textContent = displayDate(postData.createdAt)
        headerDiv.appendChild(headerDate)
        
      
     
        
    return headerDiv
}

function createPostBody(postData) {
    /*
        <p>This is a post</p>
    */
    const postBody = document.createElement("p")
    postBody.innerHTML = replaceNewlinesWithBrTags(postData.body)
    
    return postBody
}
function createPostUpdateButton(wholeDoc) {
    const postId = wholeDoc.id
    const postData = wholeDoc.data()
    const button = document.createElement("button")
    button.textContent = "Edit"
    button.classList.add("edit-color")
    button.addEventListener("click", function() {
        const newBody = prompt("Edit the post", postData.body)
       
        if (newBody) {
           updatePostInDB(postId, newBody)
        }
    })
    
    return button
}
function createPostDeleteButton(wholeDoc) {
    const postId = wholeDoc.id
  
    const button = document.createElement('button')
    button.textContent = 'Delete'
    button.classList.add("delete-color")
    button.addEventListener('click', function() {
      deletePostFromDB(postId)
    })
    return button
}


function createPostFooter(wholeDoc) {
    /* 
        <div class="footer">
            <button>Edit</button>
        </div>
    */
    const footerDiv = document.createElement("div")
    footerDiv.className = "footer"
    
    footerDiv.appendChild(createPostUpdateButton(wholeDoc))
   footerDiv.appendChild(createPostDeleteButton(wholeDoc))
    
    return footerDiv
}

function renderPost(postsEl,wholeDoc) {
    const postData = wholeDoc.data()
    const postDiv = document.createElement("div")
    postDiv.className = "post"
    
    postDiv.appendChild(createPostHeader(postData))
    postDiv.appendChild(createPostBody(postData))
    postDiv.appendChild(createPostFooter(wholeDoc))
    postsEl.appendChild(postDiv)
}

function replaceNewlinesWithBrTags(inputString) {
    return inputString.replace(/\n/g, "<br>")
}

function postButtonPressed() {
    const postBody = textareaEl.value
   
    
    if (postBody) {
        addPostToDB(postBody)
        clearInputField(textareaEl)
        
    }
}

function clearAll(element) {
    element.innerHTML = ""
}


function clearInputField(field) {
	field.value = ""
}






function displayDate(firebaseDate) {
    if (!firebaseDate) {
        return "Date processing"
    }
    
    const date = firebaseDate.toDate()
    
    const day = date.getDate()
    const year = date.getFullYear()
    
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const month = monthNames[date.getMonth()]

    let hours = date.getHours()
    let minutes = date.getMinutes()
    hours = hours < 10 ? "0" + hours : hours
    minutes = minutes < 10 ? "0" + minutes : minutes

    return `${day} ${month} ${year} - ${hours}:${minutes}`
}



function resetAllFilterButtons(allFilterButtons) {
    for (let filterButtonEl of allFilterButtons) {
        filterButtonEl.classList.remove("selected-filter")
    }
}

function updateFilterButtonStyle(element) {
    element.classList.add("selected-filter")
}

function fetchPostsFromPeriod(period) {
    if (period === "today") {
        fetchTodayPosts(user)
    } else if (period === "week") {
        fetchWeekPosts(user)
    } else if (period === "month") {
        fetchMonthPosts(user)
    } else {
        fetchAllPosts(user)
    }
}

function selectFilter(event) {
    
    
    const selectedFilterElementId = event.target.id
    
    const selectedFilterPeriod = selectedFilterElementId.split("-")[0]
    
    const selectedFilterElement = document.getElementById(selectedFilterElementId)
    
    resetAllFilterButtons(filterButtonEls)
    
    updateFilterButtonStyle(selectedFilterElement)
    
    fetchPostsFromPeriod(selectedFilterPeriod)
}

updateFilterButtonStyle(allFilterButtonEl)
fetchAllPosts()