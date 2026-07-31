// data/ieltsData.js

export const ieltsData = {
  writing: {
    task1: [
      {
        id: "w1-1",
        type: "Bar Chart",
        prompt: "The chart below shows the percentage of adults of different age groups in the UK who used the Internet every day from 2003 to 2006. Summarize the information by selecting and reporting the main features, and make comparisons where relevant.",
        minWords: 150
      },
      {
        id: "w1-2",
        type: "Map",
        prompt: "The maps below show the center of a small town called Islip as it is now, and plans for its development. Summarize the information by selecting and reporting the main features, and make comparisons where relevant.",
        minWords: 150
      },
      {
        id: "w1-3",
        type: "Process",
        prompt: "The diagram illustrates the process that is used to manufacture bricks for the building industry. Summarize the information by selecting and reporting the main features.",
        minWords: 150
      }
    ],
    task2: [
      {
        id: "w2-1",
        type: "Opinion",
        prompt: "Some people believe that university education should be free for everyone, while others think that students should pay for their higher education. Discuss both views and give your own opinion.",
        minWords: 250
      },
      {
        id: "w2-2",
        type: "Problem/Solution",
        prompt: "In many countries, cities are becoming larger and more overcrowded. What are the main causes of this problem? What solutions can you suggest?",
        minWords: 250
      },
      {
        id: "w2-3",
        type: "Discussion",
        prompt: "The continuous development of new technologies has caused significant changes in our daily lives. To what extent do you agree or disagree that these changes are positive?",
        minWords: 250
      }
    ]
  },
  speaking: {
    part1: {
      topic: "Hometown & Studies",
      questions: [
        "Let's talk about your hometown. Where is your hometown?",
        "What do you like most about it?",
        "Are you currently working or are you a student?",
        "What is the most interesting part of your studies?"
      ]
    },
    part2: {
      cueCard: "Describe a memorable journey you have made.\nYou should say:\n- Where you went\n- How you traveled\n- Who you went with\nAnd explain why this journey was so memorable.",
      prepTimeSec: 60,
      speakTimeSec: 120
    },
    part3: {
      topic: "Travel and Tourism",
      questions: [
        "How has tourism changed in your country over the last decade?",
        "What are the environmental impacts of mass tourism?",
        "Do you think people will travel more or less in the future? Why?"
      ]
    }
  },
  listening: {
    part1: {
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", // Placeholder for actual test audio
      transcript: "Receptionist: Good morning, City Leisure Centre. How can I help you?\nClient: Hello, I'd like to inquire about membership.\nReceptionist: Certainly. We have an annual membership for £450, or a monthly one for £40. Which do you prefer?\nClient: I'll go with the monthly one, please. My name is John Carter.",
      questions: [
        { qNum: 1, text: "The client chooses the ________ membership.", type: "completion", answer: "monthly" },
        { qNum: 2, text: "The client's surname is ________.", type: "completion", answer: "Carter" }
      ]
      // Parts 2, 3, and 4 would follow this identical schema
    }
  },
  reading: {
    passage1: {
      title: "The Evolution of Renewable Energy",
      content: "Renewable energy technologies have undergone massive transformations over the past two decades. Solar photovoltaics (PV), once considered an expensive niche application for satellites, are now the cheapest source of electricity in history according to the International Energy Agency. Wind power has seen similar cost curves, largely driven by material science allowing for vastly larger turbine blades. However, grid storage remains the critical bottleneck. Lithium-ion batteries have dropped in price by 89% since 2010, yet they still struggle to provide seasonal storage required for high-latitude winters.",
      questions: [
        { qNum: 1, type: "TFNG", text: "Solar PV was originally developed for use in space.", answer: "True" },
        { qNum: 2, type: "TFNG", text: "Wind power is currently cheaper than solar power.", answer: "Not Given" },
        { qNum: 3, type: "TFNG", text: "Lithium-ion batteries are perfectly suited for seasonal energy storage.", answer: "False" }
      ]
    }
  }
};
