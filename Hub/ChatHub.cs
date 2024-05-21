using Microsoft.AspNetCore.SignalR;

namespace HelloThere.Hub;


public class ChatHub : Microsoft.AspNetCore.SignalR.Hub
{
    private readonly IDictionary<string, UserRoomConnection> _connection;
    
    
    public ChatHub(IDictionary<string, UserRoomConnection> connection)
    {
        _connection = connection;
    }
    
    public async Task JoinRoom(UserRoomConnection userRoomConnection)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, userRoomConnection.RoomName);
        _connection.Add(Context.ConnectionId, userRoomConnection);
        await Clients.Group(userRoomConnection.RoomName)
            .SendAsync("ReceiveMessage", $"{userRoomConnection.UserName} has joined the room {userRoomConnection.RoomName}");
        await SendConnectedUser(userRoomConnection.RoomName);
    }
    
    public async Task SendMessage(string message)
    {
        var userRoomConnection = _connection[Context.ConnectionId];
        await Clients.Group(userRoomConnection.RoomName)
            .SendAsync("ReceiveMessage", $"{userRoomConnection.UserName}", message, DateTime.Now);
    }

    public Task SendConnectedUser(string room)
    {
        var users = _connection.Values.Where(x => x.RoomName == room).Select(x => x.UserName);
        return Clients.Group(room).SendAsync("ReceiveConnectedUsers", users);
    }
        
    
    public override Task OnDisconnectedAsync(Exception exception)
    {
        var userRoomConnection = _connection[Context.ConnectionId];
        _connection.Remove(Context.ConnectionId);
        Clients.Group(userRoomConnection.RoomName)
            .SendAsync("ReceiveMessage", $"{userRoomConnection.UserName} has left the room {userRoomConnection.RoomName}");
        return base.OnDisconnectedAsync(exception);
    }
}