// listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);

// Save Bookmark
function saveBookmark(e){
   
    // Get form values
    let siteName = document.getElementById('siteName').value;
    let siteUrl = document.getElementById('siteUrl').value;

    if(!validateForm(siteName, siteUrl)){
        return false;
    }

    let bookmark = {
        name: siteName,
        url: siteUrl
    }

    /*
        // Local Stiorage Test
        localStorage.setItem('test', 'Hello World');
        console.log(localStorage.getItem('test'));
        localStorage.removeItem('test');
        console.log(localStorage.getItem('test'));
    */

    // Test if bookmarks is null
   if (localStorage.getItem('bookmarks') === null){
        // Init array
        let bookmarks = [];
        // Add to array
        bookmarks.push(bookmark);
        // Set to localStorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
   }else{
       // Get bookmarks from localStorage
       let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
       // Add bookmark to array
       bookmarks.push(bookmark);
       // Re-set back to localStorage
       localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
   }

   // Clear Form
   document.getElementById('myForm').reset();

   // Re-fetch bookmarks
   fetchBookmarks();

   // Prevent form from submitting
   e.preventDefault();
}

// Delete Bookmark
function deleteBookmark(url){
    // Get bookmarks from localStorage
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    //Loop through bookmark
    for(let i = 0; i < bookmarks.length; i++){
        if (bookmarks[i].url == url){
            // remove from array 
            bookmarks.splice(i, 1);
        }
    }
    // Re-set back to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    // Re-fetch bookmarks
    fetchBookmarks();
}

// Fetch Bookmarks
function fetchBookmarks(){
    // Get bookmarks from localStorage
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    // Get output id
    let bookmarksResults = document.getElementById('bookmarksResults');
     
    // Build output 
    bookmarksResults.innerHTML = "";
    for(let i = 0; i < bookmarks.length; i++){
        let name = bookmarks[i].name;
        let url = bookmarks[i].url;

        bookmarksResults.innerHTML += '<div class="well">' +
                                        '<h3>' + name + 
                                        '<a class="btn btn-default" style="margin-right: 5px" target="_blank" href="'+ url +'">Visit</a>' +
                                        '<a class="btn btn-danger" onclick="deleteBookmark(\'' + url + '\')" href="#">Delete<a/>' + 
                                        '</h3>'+

                                        '</div>';
    }

}

// Validate Form
function validateForm(siteName, siteUrl){
    if(!siteName || !siteUrl){
        alert("Please fill in the form");
        return false;
    }

    let expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    let regex = new RegExp(expression);

    if(!siteUrl.match(regex)){
        alert("Please enter a valid URL");
        return false;
    }

    return true;
}