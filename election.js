document.addEventListener("DOMContentLoaded", function() {

  // Imagination!
  console.log('Dom content is loaded and parsed');
  // make axios get request to URL

  // var response = axios.get('https://bb-election-api.herokuapp.com/');

  var response = axios({
                        url: 'https://bb-election-api.herokuapp.com/',
                        method: 'get',
                        dataType: 'JSON'
                      });

  var candidateList = document.querySelector('#Candidate-List');




  response.then(function(resp){
      console.log('Response is back!')
      resp.data.candidates.forEach(function(candidate){
        console.log(candidate.name);
        let listElement = document.createElement('li')
        listElement.innerText = "Name: " + candidate.name + " Votes: " + candidate.votes;
        candidateList.append(listElement);
      });
      console.log(candidateList);
    });







});
