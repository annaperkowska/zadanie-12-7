// KLASA KANBAN CARD
function Card(id, name) {
	var self = this;
	
	this.id = id;
	this.name = name || 'No name given';
	this.element = createCard();

	function createCard() {
		var card = $('<li class="card"></li>');
		var cardDeleteBtn = $('<button class="btn-delete">x</button>');
		var cardDescription = $('<p class="card-description"></p>');
		var $cardRename = $('<button class="btn-primary">Zmień nazwę karty</button>');
		
		cardDeleteBtn.click(function(){
			self.removeCard();
		});
		$cardRename.click(function(event){
			var newCardName = prompt('Podaj nową nazwę karty');
			event.preventDefault();
			self.renameCard(newCardName);
		});
		
		card.append(cardDeleteBtn);
		cardDescription.text(self.name);
		card.append(cardDescription);
		card.append($cardRename);
		return card;
	}
}

Card.prototype = {
	removeCard: function() {
		var self = this;
		$.ajax({
			url: baseUrl + '/card/' + self.id,
			method: 'DELETE',
			success: function() {
				self.element.remove();
			}
		});
	},

	renameCard: function(newCardName) {
		var self = this;
		$.ajax({
			url: baseUrl + '/card/' + self.id,
			method: 'PUT',
			data: {
				bootcamp_kanban_column_id: self.id,
				name: newCardName
			},
			success: function(response) {
				console.log(self.element);
				self.element.find('p').replaceWith(newCardName);
			}
		});
	}
};