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
        let listElement = document.createElement('li');
        let formElement = document.createElement('form');
        formElement.method = "POST";
        formElement.action = "https://bb-election-api.herokuapp.com/vote";

        let submitButton = document.createElement('button');
        submitButton.innerText = 'Vote'
        submitButton.type = "hidden";
        submitButton.name = 'id';
        submitButton.value = candidate.id;

        formElement.append(submitButton);


        listElement.innerText = "Name: " + candidate.name + " Votes: " + candidate.votes;
        candidateList.append(listElement);
        candidateList.append(formElement);

      });
      console.log(candidateList);
    }).then(function(ob){
        var list_listener = document.querySelector('#Candidate-List');
        list_listener.addEventListener('submit', function(e){
          e.preventDefault();
          console.log('Before AXIOS');
          axios({
            url: 'https://bb-election-api.herokuapp.com/vote',
            method: 'post',
            data: {"id": e.target.querySelector('button').value}

          }).then(function(){
              console.log('Voted Bro');
          });

        })
    });


    var refresh_button = document.querySelector('#refresh-button');
    refresh_button.addEventListener('click', function(e){

      var elements = document.querySelectorAll('li');
      var update_response = axios({
                            url: 'https://bb-election-api.herokuapp.com/',
                            method: 'get',
                            dataType: 'JSON'
                          });

      update_response.then(function(response){
        var index = 0;
        response.data.candidates.forEach(function(candidate){
          console.log("Name: " + candidate.name + " Votes: " + candidate.votes);
          elements[index].innerText = "Name: " + candidate.name + " Votes: " + candidate.votes;
          index++;
        });
      });


      // console.log(elements);

    })





});
