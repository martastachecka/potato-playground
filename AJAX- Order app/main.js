/**
 * Created by Marta on 2016-09-27.
 */
$(function () {
    var $orders = $('#orders');
    var $name = $('#name');
    var $drink = $('#drink');
    function addOrder(order){
        $orders.append('<li>name:' + order.name + ' , drink:' + order.drink + '</li>');
    }
    $.ajax({
        type: 'GET',
        url: 'http://rest.learncode.academy/api/marta/friends',
        success: function (orders) {
            $.each(orders, function (i, order) {
               addOrder(order);
            });
        },
        error: function () {
            alert('error loading orders');
        }
    });
    $('#add-order').on('click', function() {
        var order = {
            name: $name.val(),
            drink: $drink.val()
        };
        $.ajax({
            type: 'POST',
            url: 'http://rest.learncode.academy/api/marta/friends',
            data: order,
            success: function (newOrder) {
                addOrder(newOrder);
            },
            error: function () {
                alert('error saving order');
            }
        });
    });
});