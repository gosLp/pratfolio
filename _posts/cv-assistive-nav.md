---
title: "Vision-based Assistive Navigation: Real-time Hazard Detection for the Visually Impaired"
excerpt: "A computer vision system that combines YOLO object detection, BLIP scene captioning, and generative AI to provide real-time hazard avoidance directions for visually impaired users."
coverImage: "/assets/blog/cv-nav/cover.jpg"
date: "2024-11-10T05:35:07.322Z"
author:
  name: Pratheek Shetty
  picture: "/assets/blog/authors/pratfolio1.jpg"
ogImage:
  url: "/assets/blog/cv-nav/teaser.png"
---

# Vision-based Assistive Navigation

## Project Overview

A smartphone-based navigation system that helps visually impaired users detect and avoid hazards in real-time. The system uses advanced computer vision and natural language processing to identify objects, understand scenes, and provide audio guidance.

Here is the external link to the github pages project page
[This is an external link to cv-nav](https://goslp.github.io/cv-assistive-nav/)

## Key Technologies

- **Computer Vision**: YOLOv8 nano, BLIP
- **AI/ML**: ChatGPT-4 API
- **Speech Synthesis**: pyttsx3
- **Development**: Python, OpenCV

![Overview of workflow for each task](/assets/blog/cv-nav/workflow.png)

## Core Features

### 1. Real-time Object Detection

- Multi-object detection using YOLOv8 nano
- Efficient hazard identification (vehicles, stairs, pedestrians)
- Optimized for mobile devices
- 72% success rate in hazard detection

![Object detection demo showing identified hazards](/assets/blog/cv-nav/Object-det_example.mp4)

### 2. Scene Understanding

- Context-aware scene captioning using BLIP
- Environmental hazard assessment
- Real-time scene description generation

### 3. Intelligent Guidance

- Natural language instructions via ChatGPT-4
- Context-aware navigation suggestions
- Clear, actionable guidance for users

![Guidance system interface](/assets/blog/cv-nav/guidance_image.png)

## Technical Implementation

### System Architecture

```python
# Core system workflow:
1. Camera input processing
2. YOLO object detection
3. BLIP scene captioning
4. LLM-based instruction generation
5. Text-to-speech output
```

## Performance Metrics

- Object Detection Accuracy: 85%
- Scene Caption Accuracy: 78%
- Real-time Response Rate: <500ms
- Overall System Success Rate: 72%

![Performance metrics chart](/assets/blog/cv-nav/test_metrics.png)

## Challenges & Solutions

### Real-time Processing

**Challenge**: Achieving fast processing on mobile devices
**Solution**: Optimized YOLO nano model and efficient API calls

### Accurate Scene Understanding

**Challenge**: Complex environment interpretation
**Solution**: Combined object detection with BLIP captioning

### Natural Guidance

**Challenge**: Converting visual data to useful instructions  
**Solution**: Prompt-engineered ChatGPT-4 integration

## Future Improvements

1. Integration of lightweight LLMs for offline processing
2. Enhanced depth perception capabilities
3. Improved human-like text-to-speech synthesis
4. Extended hazard detection database

![System demo](/assets/blog/cv-nav/excelent-case.mp4)

## Project Impact

The system provides an accessible, smartphone-based solution for visually impaired individuals, eliminating the need for specialized hardware while maintaining high accuracy in hazard detection and guidance.

![Real-world usage example](/assets/blog/cv-nav/well-case.mp4)
