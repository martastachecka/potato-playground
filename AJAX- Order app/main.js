/**
 * Created by Marta on 2016-09-27.
 */
$(function () {
    var $orders = $('#orders');
    var $name = $('#name');
    var $drink = $('#drink');
    var orderTemplate = "" +
        "<li>" +
        "<p><strong>Name:</strong>{{name}}</p>" +
        "<p><strong>Drink:</strong>{{drink}}</p>" +
        "<button data-id='{{id}}' class='remove'>X</button>" +
        "</li>";

    function addOrder(order) {
        $orders.append(Mustache.render(orderTemplate, order));
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
    $('#add-order').on('click', function () {
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

    $orders.delegate('.remove', 'click', function() {
        var $li = $(this).closest('li');
        $.ajax({
            type: 'DELETE',
            url: 'http://rest.learncode.academy/api/marta/friends'+ $(this).attr('data-id'),
            success: function () {
                $li.fadeOut(300, function () {
                    $(this).remove();
                });
            }
        });
    });
});

