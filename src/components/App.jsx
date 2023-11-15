import React, { Component } from 'react';
import { FeedbackOptions } from './FeedbackOptions/FeedbackOptions';
import {Statistics  } from './Statistics/Statistics';
import { Section } from './Section/Section';
import { Notification } from './Notification/Notification';


export class App extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  onLeaveFeedback = state => {
    this.setState(prevState => ({ [state]: prevState[state] + 1 }));
  };

  countTotalFeedback = () => {
  
    return Object.values(this.state).reduce((total, number) => (total += number));
  };

  countPositiveFeedbackPercentage = (totalFeedback) => {
    const { good } = this.state;

    if (totalFeedback > 0) return Math.round(good * 100 / totalFeedback);
    return 0;
  };

  render() {
    const { good, neutral, bad } = this.state;
    const options = Object.keys(this.state);
    const totalFeedback = this.countTotalFeedback();
    const totalPercentage = this.countPositiveFeedbackPercentage(totalFeedback);
    return (
      <div>
        <Section title='Please leave feedback'>
        <FeedbackOptions
            onLeaveFeedback={this.onLeaveFeedback}
            options={options}
          />
        </Section>
        <Section title='Statistics'>
        {totalFeedback !== 0 ? (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={totalFeedback}
            positivePercentage={totalPercentage}
          />      
          ) : (
            <Notification message="There is no feedback" />
          )}  
         
        </Section>               
      </div>
    );
  }
}