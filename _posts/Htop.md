---
title: 'Rust Powered Htop like WebApp to track Sys performance'
excerpt: 'a Rust-powered web application that functions as a real-time system performance tracker, similar to the popular htop tool. We'll delve into the source code of the Rust application and understand its components that enable us to monitor various aspects of system performance, including CPU usage and network activity.
'
coverImage: '/assets/blog/preview/cover.jpg'
date: '2023-06-14T05:35:07.322Z'
author:
  name: Pratheek Shetty
  picture: '/assets/blog/authors/pratfolio1.jpg'
ogImage:
  url: '/assets/blog/preview/cover.jpg'
---

In this blog post, we will explore a Rust-powered web application that functions as a real-time system performance tracker, similar to the popular htop tool. We'll delve into the source code of the Rust application and understand its components that enable us to monitor various aspects of system performance, including CPU usage and network activity.

## Introduction
The provided Rust application leverages the axum framework for building asynchronous web applications and the sysinfo library to gather system information. The application exposes a web interface that displays real-time updates on CPU usage and network activity. Users can access this interface through a web browser, making it a convenient tool for monitoring system performance remotely.

## Application Architecture
The application is built using the axum framework, which is designed for asynchronous and composable web services. The key components of the application are:

Routes: The application defines various routes to handle different types of requests. These routes serve HTML, JavaScript, and CSS files, as well as WebSocket endpoints for real-time data streaming.

State Management: The application utilizes the State extractor from axum to manage the application's state. It uses broadcast channels to send real-time data updates to WebSocket clients.

Background Task: A background task is responsible for periodically refreshing system information, such as CPU usage and network activity, and broadcasting this data to WebSocket clients.

## Exploring the Code
### Main Function
The main function initializes the application, sets up routes, state, and background tasks, and starts the server. It also initializes the system information gathering using the sysinfo library.

### State Management
The AppState and DAppState structs manage the state of the application. They hold the broadcast channels (broadcast::Sender) used to send real-time data updates to WebSocket clients.

### Real-Time Data Streaming
The realtime_cpus_stream and realtime_cpu_network_stream functions handle the real-time data streaming over WebSocket connections. They subscribe to the broadcast channels and send updates to connected clients as JSON messages.

### Background Task
A background task runs in a separate thread and periodically refreshes system information using the sysinfo library. It collects CPU usage and network activity data and broadcasts this information to WebSocket clients.

## Conclusion
The Rust-powered web application showcased in this blog post provides a convenient way to monitor system performance in real time through a web browser. By leveraging the axum framework and the sysinfo library, the application effectively gathers and streams system information to connected clients.

You can find the full source code of this Rust application here.

Feel free to explore, modify, and extend the application to suit your specific monitoring needs. Happy coding!

Note: The provided source code is a partial representation of the application. The complete implementation may require additional setup and considerations.


