document.addEventListener("DOMContentLoaded", function () {
  const joinBtn = document.getElementById("joinBtn");

  joinBtn.addEventListener("click", async function () {
    const userIdInput = document.getElementById("id");
    const userId = userIdInput.value; // Get the value of the input field

    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        console.log("User joined room successfully!");
        // Redirect user to the chat room or show success message
        // Establish WebSocket connection
        const socket = io.connect("http://localhost:3000");

        // Listen for events from the server
        socket.on("connect", () => {
          console.log("Connected to server");
        });

        socket.on("disconnect", () => {
          console.log("Disconnected from server");
        });

        socket.on("message", (data) => {
          console.log("Message from server:", data);
          // Handle incoming messages from the server
        });

        // Emit events to the server
        socket.emit("someEvent", { userId });
      } else {
        console.error("Failed to join room:", response.statusText);
        // Show error message to the user
      }
    } catch (error) {
      console.error("Failed to join room because of server:", error);
      // Show error message to the user
    }
  });
});
