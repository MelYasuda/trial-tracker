import React, {Component} from 'react';
import {Text, View, StyleSheet } from 'react-native';
import { Formik, useFormikContext } from 'formik';
import * as Yup from 'yup';
import { Input, Button } from 'react-native-elements';
import CalendarPicker from 'react-native-calendar-picker';

const DatePickerField = ({ name, onDateChange }) => {
  const formik = useFormikContext();
  const field = formik.getFieldProps(name);
  return (
    <View style={{    
      backgroundColor: 'white',
    }}>
    <CalendarPicker
      onDateChange={onDateChange}
      selectedDayColor="#66ff33"
      selectedDayTextColor="#000000"
      previousTitle="<"
      nextTitle=">"
      value={field.value}
      onDateChange={value => formik.setFieldValue(name, value)}
    />
    </View>
  );

}

export default class TrialForm extends Component {
    constructor(props) {
      super(props);
      this.state = {
        selectedStartDate: null,
      };
    }
    
    onDateChange = (date) => {
      this.setState({
        selectedStartDate: date,
      });
    }
    
    render() {
      const { selectedStartDate } = this.state;
      const startDate = selectedStartDate ? selectedStartDate.toString() : '';
      return (
        <View>
          <Formik 
            initialValues={{ title: '', startDate: '', duration: '', endDate: '', note: ''}}
            onSubmit={this._handleSubmit}
            validationSchema={Yup.object().shape({
              title: Yup.string().required('Chore description is required'),
              endDate: Yup.string().required('Day needs to be chosen')
            })}
            component={({
              values,
              handleSubmit,
              setFieldValue,
              setFieldTouched,
              errors,
              touched,
            }) => (
              <View>
                <Text onPress={handleSubmit} style={{color: "orange", textAlign: "right"}}>Save</Text>
                <Input
                  placeholder='trial name'
                  style={{backgroundColor: 'white'}}
                />
                <DatePickerField 
                  name={'startDate'}
                  onDateChange={this.onDateChange} />
              </ View>
            )}
            />
        </View>
        
        
        
      );
    }
}