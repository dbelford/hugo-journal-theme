/** Remember

FUSE OPTIONS DUPLICATED IN SEARCH_WORKER.JS
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

**/
summaryInclude=60;
var fuseOptions = {
  shouldSort: true,
  includeMatches: true,
  matchAllTokens: true,
  findAllMatches: true,
  threshold: 0.0,
  tokenize:true,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: [
    {name:"title",weight:1.0},
    {name:"parent", weight: 1.0},
    {name:"contents",weight:0.2},
    {name:"tags",weight:0.3},
    {name:"categories",weight:0.3}
  ]
};


// var searchQuery = param("s");
// if(searchQuery){
//   $("#search-query").val(searchQuery);
//   executeSearch(searchQuery);
// }else {
//   $('#search-results').append("<p>Please enter a word or phrase above</p>");
// }

var searchQuery = ""
var currentSearch = ""
var searchWorker = new Worker('/js/search_worker.js')
var searchIndex = undefined
var fuse = undefined
var templateDefinition = undefined;
let useWorker = typeof(Worker) !== "undefined"

if (useWorker) { // Yes! Web worker support!
  // Maybe should be loading search worker here
  // if (searchWorker == undefined) { searchWorker = new Worker('/js/search_worker.js')

  searchWorker.addEventListener('message', function(msg) {
    // msg.data.results
    // msg.data.searchQuery
    switch (msg.data.msgType) {
      case 'search':
        //handled by worker
        break;
      case 'results':
        handleSearchResults(msg.data.results);
        break;
      default:
      throw 'no support for message type on this worker';
    }    
  });
} else {
  // No web worker support
}

$(document).ready(function() {

  // Handle searching
  $("#search-query").on( 'input', function() {
    searchQuery = this.value;
    if (this.value.length > 0) {
      startSearch(this.value);
    } else {
      $('#search-results').empty();
    }
  });

  // Handle dismissing auto complete
  $('body').on( 'touch click', function(event) {
    var container = $(event.target).closest('.search-container')
    if (!container.length) {
      $('#search-results').empty();
    }
  });

  // Handle escape on input
  $("#search-query").on('keyup', function(e){
      if (e.which == 27) { 
          $(event.target).blur()
          $('#search-results').empty();
      }    
  });

  templateDefinition = $('#search-result-template').html();
});

function getSearchIndex(cb) {
  $.getJSON( "/index.json", function( data ) {
    searchIndex = data;
    fuse = new Fuse(data, fuseOptions);
    cb();
  });
}

function startSearch(searchQuery){
  if (useWorker) { // Yes! Web worker support!
    searchWorker.postMessage({msgType: 'search', searchQuery: searchQuery});
  } else { // Sorry! No Web Worker support..
    console.log('searching222');
    if (searchIndex) {
      let r = handleSearchResults(fuse.search(searchQuery));
      buildResultsDom(r);
    } else {
      getSearchIndex(function() {
        handleSearchResults(fuse.search(searchQuery));
      });
    }
  }
}

function handleSearchResults( foundItems ) {
  if(foundItems.length > 0){
    var el = buildResultsDom(foundItems);
    $('#search-results').empty();
    $('#search-results').append(el);
  } else {
    $('#search-results').empty()
    $('#search-results').append("<p>No matches found</p>");
  }
}

function buildResultsDom(foundItems) {
  var el = document.createElement('div');
  //pull template from hugo templarte definition
  console.log(foundItems);
  $.each(foundItems,function(key,value){
    var contents= value.item.contents;
    var snippet = contents.substring(0,summaryInclude*2);;  
    
    //replace values
    var output = render(templateDefinition,{key:key,title:value.item.title,link:value.item.permalink,tags:value.item.tags,categories:value.item.categories,snippet:snippet, section:value.item.section});
    $(el).append(output);

    // $.each(snippetHighlights,function(snipkey,snipvalue){
    //   $("#summary-"+key).mark(snipvalue);
    // });

  });
  return el;
}

function param(name) {
    return decodeURIComponent((location.search.split(name + '=')[1] || '').split('&')[0]).replace(/\+/g, ' ');
}

function render(templateString, data) {
  var conditionalMatches,conditionalPattern,copy;
  conditionalPattern = /\$\{\s*isset ([a-zA-Z]*) \s*\}(.*)\$\{\s*end\s*}/g;
  //since loop below depends on re.lastInxdex, we use a copy to capture any manipulations whilst inside the loop
  copy = (' ' + templateDefinition).slice(1);
  copy = templateDefinition;
  while ((conditionalMatches = conditionalPattern.exec(templateString)) !== null) {
    if(data[conditionalMatches[1]]){
      //valid key, remove conditionals, leave contents.
      copy = copy.replace(conditionalMatches[0],conditionalMatches[2]);
    }else{
      //not valid, remove entire section
      copy = copy.replace(conditionalMatches[0],'');
    }
  }
  templateString = copy;
  //now any conditionals removed we can do simple substitution
  var key, find, re;
  for (key in data) {
    find = '\\$\\{\\s*' + key + '\\s*\\}';
    re = new RegExp(find, 'g');
    templateString = templateString.replace(re, data[key]);
  }
  return templateString;
}




function copyToClipboard(str) {

  // Create a "hidden" input
  var aux = document.createElement("input");

  // Assign it the value of the specified element
  aux.setAttribute("value", str);

  // Append it to the body
  document.body.appendChild(aux);

  // Highlight its content
  aux.select();

  // Copy the highlighted text
  document.execCommand("copy");

  // Remove it from the body
  document.body.removeChild(aux);

}


