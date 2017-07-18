'use strict';

// Register `phoneList` component, along with its associated controller and template
angular.
  module('phoneList').
  component('phoneList', {
    templateUrl: 'phone-list/phone-list.template.html',
    controller: ['$http', function PhoneListController($http) {
      const self = this;

      function timeSince(date) {
        var seconds = Math.floor((new Date() - date) / 1000);
        var interval = Math.floor(seconds / 31536000);
        if (interval > 1) {
          return interval + " years";
        }
        interval = Math.floor(seconds / 2592000);
        if (interval > 1) {
          return interval + " months";
        }
        interval = Math.floor(seconds / 86400);
        if (interval > 1) {
          return interval + " days";
        }
        interval = Math.floor(seconds / 3600);
        if (interval > 1) {
          return interval + " hours";
        }
        interval = Math.floor(seconds / 60);
        if (interval > 1) {
          return interval + " minutes";
        }
        return Math.floor(seconds) + " seconds";
      }

      $http.get('https://www.reddit.com/r/all.json').then(function(response) {
        const results = response.data.data.children;
        const items = [];
        results.map(item => {
          const { url, ups, thumbnail, title, num_comments: numComments, author: from, subreddit_name_prefixed: to, created_utc: created } = item.data;
          const timestamp = timeSince(new Date(created * 1000)) + ' ago';
          const comments = `${numComments} comments`;
          items.push({ url, ups, thumbnail, title, timestamp, from, to, comments });
        })
        self.itemsData = items;
      });
    }]
  });
