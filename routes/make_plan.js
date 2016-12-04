var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

/* GET home page. */
router.get('/travel', function(req, res, next) {
  res.render('travel_plan', { title: 'Express' });
});

router.get('/travel/detail', function(req, res, next) {
  var photos = new Array();
  photos[0] = '/assets/images/demo/1200x800/10-min.jpg';
  photos[1] = '/assets/images/demo/1200x800/3-min.jpg';
  photos[2] = '/assets/images/demo/1200x800/21-min.jpg';
  var comments = new Array();
  comments[0] = {
    commentwriter : 'John Doe',
    commentday : 'June 29, 2014 - 11:23',
    commentcontent : 'Proin eget tortor risus. Cras ultricies ligula sed magna dictum porta. Pellentesque in ipsum id orci porta dapibus. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    commentavartar : '/assets/images/avatar.png'
  };
  comments[1] = {
    commentwriter : 'John 2',
    commentday : 'June 29, 2014 - 11:23',
    commentcontent : 'Proin eget tortor risus. Cras ultricies ligula sed magna dictum porta. Pellentesque in ipsum id orci porta dapibus. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    commentavartar : '/assets/images/avatar.png'
  };
  res.render('travel_plan_detail', { title: 'Express' ,
    blogtitle : 'blogtitle',
    detailday : 'June 29, 2015',
    writer : 'john Doe',
    photos : photos,
    contents : 'Aliquam fringilla, sapien eget scelerisque placerat, lorem libero cursus lorem, sed sodales lorem libero eu sapien. Nunc mattis feugiat justo vel faucibus. Nulla consequat feugiat malesuada. Ut justo nulla, facilisis vel molestie id, dictum ut arcu. Nunc ipsum nulla, eleifend non blandit quis, luctus quis orci. Cras blandit turpis mattis nulla ultrices interdum. Mauris pretium pretium dictum. Nunc commodo, felis sed dictum bibendum, risus justo iaculis dui, nec euismod orci sem eget neque. Donec in metus metus, vitae eleifend lorem. Ut vestibulum gravida venenatis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Pellentesque suscipit tincidunt magna non mollis. Fusce tempus tincidunt nisi, in luctus elit pellentesque quis. Sed velit mi, ullamcorper ut tempor ut, mattis eu lacus. Morbi rhoncus aliquet tellus, id accumsan enim sollicitudin vitae. Vivamus, lacinia eget consectetur sed, convallis at tellus. Cras ultricies ligula sed magna dictum porta. Curabitur aliquet quam id dui posuere blandit. Sed porttitor lectus nibh. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Nulla porttitor accumsan tincidunt. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus.Quisque velit nisi, pretium ut lacinia in, elementum id enim. Sed porttitor lectus nibh. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Donec rutrum congue leo eget malesuada. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Pellentesque in ipsum id orci porta dapibus. Nulla quis lorem ut libero malesuada feugiat. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Proin eget tortor risus. Cras ultricies ligula sed magna dictum porta. Pellentesque in ipsum id orci porta dapibus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla porttitor accumsan tincidunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    comments : comments
  });
});

module.exports = router;
