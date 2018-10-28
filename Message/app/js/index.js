
import EmbarkJS from 'Embark/EmbarkJS';

import $ from 'jquery';

import Message from 'Embark/contracts/Message';

$(document).ready(function() {
  EmbarkJS.onReady((error) => {
    if (error) {
      console.error('Error while connecting to web3', error);
      return;
    }
    web3.eth.getAccounts(function(err, accounts) {
        $('#balance input').val(accounts[0]);
      });

    $('#write_mess button').click(function() {
      var mess = $('#write_mess .u_message').val();
      Message.methods.set(mess).send();
      });

      $("#read_mess button").click(function() {
    Message.methods.get().call().then(function(mess) {
      $("#read_mess .retu").html(mess);
    });
  });

  $('#balance button').click(function() {
    var address = $('#balance input').val();
    Message.methods.get_balance(address).call().then(function(address) {
      $('#balance .result_b').html(address);
    });
  });

});
});
