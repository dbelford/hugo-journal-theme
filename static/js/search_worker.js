
importScripts('./fuse.min.js');
importScripts('./axios.min.js');

var fuse = undefined;

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

self.onmessage = function (msg) {
  switch (msg.data.msgType) {
    case 'search':
      startSearch(msg.data.searchQuery);
    break;
    case 'results':
      //handled on main page
    break;
    default:
    throw 'no support for message type on this worker';
  }
}

function getSearchIndex(cb) {
  axios.get("/index.json")
  .then(function (response) {
    // handle success
    fuse = new Fuse(response.data, fuseOptions);
    cb();
  })
  .catch(function (error) {
    console.log(error); // handle error
  });
}

function startSearch(searchQuery){
  if (fuse) {
    var searchresults = fuse.search(searchQuery);//.map(function(value,key){ return {item: value.item } });
    self.postMessage({msgType: 'results', results : searchresults });
  } else {
    getSearchIndex(function() {
      var searchresults = fuse.search(searchQuery);//.map(function(value,key){ return {item: value.item } });
      self.postMessage({msgType: 'results', results : searchresults });
    });
  }
}