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
    // Read checklist items to render a status badge on the card front
    return t.get('card', 'shared', 'checklistItems', [])
      .then(function (items) {
        if (items && items.length > 0) {
          var remaining = items.reduce(function (sum, item) {
            return sum + (item.done ? 0 : (parseInt(item.estimate, 10) || 0));
          }, 0);
          var total = items.reduce(function (sum, item) {
            return sum + (parseInt(item.estimate, 10) || 0);
          }, 0);
          
          return [
            {
              icon: './icon.svg',
              text: remaining + 'm / ' + total + 'm left',
              color: remaining > 0 ? 'sky' : 'green'
            }
          ];
        }
        return [];
      });
  },

  'card-detail-badges': function (t, options) {
    // Read checklist items to show details on the card back
    return t.get('card', 'shared', 'checklistItems', [])
      .then(function (items) {
        if (items && items.length > 0) {
          var remaining = items.reduce(function (sum, item) {
            return sum + (item.done ? 0 : (parseInt(item.estimate, 10) || 0));
          }, 0);
          var total = items.reduce(function (sum, item) {
            return sum + (parseInt(item.estimate, 10) || 0);
          }, 0);
          
          return [
            {
              title: 'Checklist Estimate',
              text: remaining + 'm remaining (Total: ' + total + 'm)',
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
