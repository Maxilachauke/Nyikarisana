// Simple example to check Firebase is ready
document.addEventListener("DOMContentLoaded", () => {
    const statusDiv = document.getElementById("status");

    if (firebase.apps.length > 0) {
        statusDiv.textContent = "Firebase initialized successfully!";
    } else {
        statusDiv.textContent = "Firebase NOT initialized.";
    }

    // Example: You can now use `db` and `auth` here
    // For instance, to test Firestore connection or Auth state
});
