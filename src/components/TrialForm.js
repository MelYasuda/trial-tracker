import React, {Component} from 'react';
import {Text, View, StyleSheet, Easing, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Formik, useFormikContext } from 'formik';
import * as Yup from 'yup';
import { Input, Button } from 'react-native-elements';
import CalendarPicker from 'react-native-calendar-picker';
import moment from 'moment';
import Accordion from 'react-native-collapsible/Accordion';
import * as Animatable from 'react-native-animatable';

const DatePickerField = ({ name, onDateChange }) => {
  const formik = useFormikContext();
  const field = formik.getFieldProps(name);
  return (
    <View style={{    
      backgroundColor: 'white',
    }}>
    <CalendarPicker
      //onDateChange={onDateChange}
      selectedDayColor="#66ff33"
      selectedDayTextColor="#000000"
      previousTitle="<"
      nextTitle=">"
      value={field.value}
      onDateChange={value => 
        {
          onDateChange();
          formik.setFieldValue(name, value)
        }
      }
    />
    </View>
  );

}

export default class TrialForm extends Component {
    constructor(props) {
      super(props);
      this.state = {
        selectedStartDate: null,
        startingDateActive: [],
        endingDateActive: [],
      };
    }
    
    onStartDateChange = (date) => {
      console.log('ddd');
      this.setState({
        selectedStartDate: date,
      });
    }
    
    onEndDateChange = (date) => {
      console.log('ccc');
      // this.setState({
      //   selectedStartDate: date,
      // });
    }
    
    dateParse = (date) => {
      return date[1] + ' ' + date[2] + ', ' + date[3];
    }

    _renderHeader = section => {
      return (
        <View>
          <Text style={{color: 'white', fontSize: 30}}>{section.title}</Text>
        </View>
      );
    };

    _renderCalender = section => {
      return (
        <View>
          {section.content}
        </View>
      );
    };
    
    setDuration = duration => {
      console.log(duration);
      
    }

  _openStartingDate = startingDateActive => {
    this.setState({ startingDateActive: startingDateActive, endingDateActive: [] });
  };

  _openEndingDate = endingDateActive => {
    this.setState({ endingDateActive:  endingDateActive, startingDateActive: []});
  };
  
  _handleSubmit = (values) => {
    this.props.addTrial(values);
  }
    
    render() {
      const { selectedStartDate } = this.state;
      const startDate = selectedStartDate ? selectedStartDate.toString() : '';
      return (
        <ScrollView>
          <Formik 
            initialValues={{ title: '', startDate: moment(), duration: '30', endDate: moment(), note: ''}}
            onSubmit={this._handleSubmit}
            // validationSchema={Yup.object().shape({
            //   title: Yup.string().required('Chore description is required'),
            //   endDate: Yup.string().required('Day needs to be chosen')
            // })}
          >
          {props => (
            <View>
              <Text onPress={props.handleSubmit} style={{color: "orange", textAlign: "right"}}>Save</Text>
              <Input
                placeholder='trial name'
                style={{color: 'white'}}
              />
              <Accordion
                activeSections={this.state.startingDateActive}
                renderHeader={this._renderHeader}
                renderContent={this._renderCalender}
                onChange={this._openStartingDate}
                duration={500}
                touchableComponent={TouchableOpacity}
                sections={[{
                  title: this.dateParse(props.values.startDate.toString().split(' ')),
                  content: <DatePickerField 
                            name={'startDate'}
                            onDateChange={this.onStartDateChange} />
                  },
                ]}
              />
              <TextInput 
                style={{color: 'white'}}
                keyboardType = 'numeric'
                onChangeText={ 
                  (e) => {
                    (() => {
                      props.values.endDate = moment(props.values.startDate).add(e, 'days');
                    })();
                    props.handleChange('duration')(e);  
                }}
                
                value={props.values.duration}
                name='duration'
              /> 
              <Accordion
                activeSections={this.state.endingDateActive}
                renderHeader={this._renderHeader}
                renderContent={this._renderCalender}
                onChange={this._openEndingDate}
                duration={500}
                touchableComponent={TouchableOpacity}
                sections={[{
                  title: this.dateParse(props.values.endDate.toString().split(' ')),
                  content: <DatePickerField 
                            name={'endDate'}
                            onDateChange={this.onEndDateChange} />
                },
              ]}
              />
              <TextInput
                style={{color: 'white'}}
                onChangeText={props.handleChange('note')}
                value={props.values.note}
                name='note'
               />
            </ View>
          )}

            </ Formik>
        </ScrollView>
        
        
        
      );
    }
}