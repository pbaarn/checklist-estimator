/* global TrelloPowerUp */

TrelloPowerUp.initialize({
  'card-buttons': function (t, options) {
    return [
      {
        icon: './icon.svg',
        text: 'Custom Notes',
        callback: function (t) {
          return t.popup({
            title: 'Custom Card Notes',
            url: './popup.html',
            height: 220
          });
        }
      }
    ];
  },

  'card-back-section': function (t, options) {
    // Registers a custom panel on the back of the card
    return {
      title: 'Estimated Checklist',
      icon: './icon.svg',
      content: {
        type: 'iframe',
        url: t.signUrl('./checklist.html'),
        height: 280 // Initial height, the iframe will dynamically auto-resize itself
      }
    };
  },
  
  'card-badges': function (t, options) {
    // Read checklist items and due date state to render status badge on card front
    return Promise.all([
      t.get('card', 'shared', 'checklistItems', []),
      t.card('dueComplete'),
      t.get('card', 'shared', 'lastDueComplete', false)
    ]).then(function (results) {
      var items = results[0];
      var dueComplete = (results[1] && results[1].dueComplete) || false;
      var lastDueComplete = results[2];

      if (items && items.length > 0) {
        // Sync checklist items to completed if card transitioned to completed
        if (dueComplete && !lastDueComplete) {
          var anyUnfinished = items.some(function(item) { return !item.done; });
          if (anyUnfinished) {
            items = items.map(function(item) { return Object.assign({}, item, { done: true }); });
            t.set('card', 'shared', 'checklistItems', items);
            t.set('card', 'shared', 'lastDueComplete', true);
          }
        } else if (dueComplete !== lastDueComplete) {
          t.set('card', 'shared', 'lastDueComplete', dueComplete);
        }

        var totalItems = items.length;
        var remainingItems = items.filter(function (item) { return !item.done; }).length;
        
        // Show green completed badge if checklist is completed OR the card due date is marked complete
        if (remainingItems === 0 || dueComplete) {
          var totalActual = items.reduce(function (sum, item) {
            var actualVal = item.hasOwnProperty('actual') ? parseInt(item.actual, 10) : parseInt(item.estimate, 10);
            return sum + (actualVal || 0);
          }, 0);
          var totalEstimate = items.reduce(function (sum, item) {
            return sum + (parseInt(item.estimate, 10) || 0);
          }, 0);
          return [
            {
              icon: './icon.svg',
              text: totalActual + 'm / ' + totalEstimate + 'm spent',
              color: 'green'
            }
          ];
        }

        var remaining = items.reduce(function (sum, item) {
          return sum + (item.done ? 0 : (parseInt(item.estimate, 10) || 0));
        }, 0);
        var total = items.reduce(function (sum, item) {
          return sum + (parseInt(item.estimate, 10) || 0);
        }, 0);
        
        return [
          {
            icon: './icon.svg',
            text: remaining + 'm / ' + total + 'm left (' + remainingItems + '/' + totalItems + ')',
            color: remaining > 0 ? 'sky' : 'green'
          }
        ];
      }
      return [];
    });
  },

  'card-detail-badges': function (t, options) {
    // Read checklist items and due date state to show details on card back
    return Promise.all([
      t.get('card', 'shared', 'checklistItems', []),
      t.card('dueComplete'),
      t.get('card', 'shared', 'lastDueComplete', false)
    ]).then(function (results) {
      var items = results[0];
      var dueComplete = (results[1] && results[1].dueComplete) || false;
      var lastDueComplete = results[2];

      if (items && items.length > 0) {
        // Sync checklist items to completed if card transitioned to completed
        if (dueComplete && !lastDueComplete) {
          var anyUnfinished = items.some(function(item) { return !item.done; });
          if (anyUnfinished) {
            items = items.map(function(item) { return Object.assign({}, item, { done: true }); });
            t.set('card', 'shared', 'checklistItems', items);
            t.set('card', 'shared', 'lastDueComplete', true);
          }
        } else if (dueComplete !== lastDueComplete) {
          t.set('card', 'shared', 'lastDueComplete', dueComplete);
        }

        var totalItems = items.length;
        var remainingItems = items.filter(function (item) { return !item.done; }).length;
        
        // Show green completed badge if checklist is completed OR the card due date is marked complete
        if (remainingItems === 0 || dueComplete) {
          var totalActual = items.reduce(function (sum, item) {
            var actualVal = item.hasOwnProperty('actual') ? parseInt(item.actual, 10) : parseInt(item.estimate, 10);
            return sum + (actualVal || 0);
          }, 0);
          var totalEstimate = items.reduce(function (sum, item) {
            return sum + (parseInt(item.estimate, 10) || 0);
          }, 0);
          return [
            {
              title: 'Checklist Estimate',
              text: 'Completed: ' + totalActual + 'm spent (Est: ' + totalEstimate + 'm) • ' + totalItems + ' items',
              color: 'green'
            }
          ];
        }

        var remaining = items.reduce(function (sum, item) {
          return sum + (item.done ? 0 : (parseInt(item.estimate, 10) || 0));
        }, 0);
        var total = items.reduce(function (sum, item) {
          return sum + (parseInt(item.estimate, 10) || 0);
        }, 0);
        
        return [
          {
            title: 'Checklist Estimate',
            text: remaining + 'm remaining (Total: ' + total + 'm) • ' + remainingItems + '/' + totalItems + ' items left',
            color: remaining > 0 ? 'sky' : 'green'
          }
        ];
      }
      return [];
    });
  },

  'show-settings': function (t, options) {
    return t.popup({
      title: 'Power-Up Settings',
      url: './settings.html',
      height: 250
    });
  }
});
