<template>
  <div class="container">
    <h4>Employee: {{ overtime.firstName }} {{ overtime.lastName }}</h4>
    <h4>
      Approver:
      {{ manager.firstName }}
      {{ manager.lastName }}
    </h4>
    <form class="form-horizontal col-sm-12">
      <div class="form-group row">
        <label for="requestDate" class="col-sm-3">Date</label>
        <div class="col-sm-6">
          <datetime
            type="date"
            format="dd/MM/yy"
            v-model="overtime.requestDate"
            input-class="form-control"
            disabled
          ></datetime>
        </div>
      </div>
      <div class="form-group row">
        <label for="fromTime" class="col-sm-3">From</label>
        <div class="col-sm-6">
          <datetime
            type="datetime"
            format="dd/MM/yy H:mm"
            v-model="overtime.fromTime"
            input-class="form-control"
          ></datetime>
        </div>
      </div>
      <div class="form-group row">
        <label for="toTime" class="col-sm-3">to</label>
        <div class="col-sm-6">
          <datetime
            type="datetime"
            v-model="overtime.toTime"
            format="dd/MM/yy H:mm"
            input-class="form-control"
            v-on:input="hourDiff"
          ></datetime>
        </div>
      </div>
      <div class="form-group row">
        <label for="totalTime" class="col-sm-3">Total time</label>
        <div class="col-sm-6">
          <b-form-input
            type="number"
            id="totalTime"
            disabled
            v-model="overtime.totalTime"
          />
        </div>
      </div>
      <div class="form-group row">
        <label for="reason" class="col-sm-3">Reason</label>
        <div class="col-sm-6">
          <textarea v-model="overtime.reason" class="form-control" />
        </div>
      </div>
      <div class="row">
        <button class="btn btn-primary" @click.prevent="submit">
          Submit
        </button>
      </div>
    </form>
  </div>
</template>
<script>
import moment from 'moment';
import {Thai} from 'flatpickr/dist/l10n/th.js';
import axios from 'axios';
import _ from 'lodash';
var overtime;
export default {
  name: 'OvertimeCreate',

  data() {
    return {
      config: {
        locale: Thai,
        enableTime: true,
        dateFormat: 'Y-m-d H:i',
        time_24hr: true,
        disableMobile: true,
      },
      overtime: {
        requestDate: new Date().toISOString(),
        fromTime: '',
        toTime: '',
        totalTime: 0,
        reason: '',
        employeeId: '',
        approverId: '',
        firstName: this.$store.state.firstName,
        lastName: this.$store.state.lastName,
        status: 'opened',
      },
      manager: {
        id: '',
        firstName: '',
        lastName: '',
        email: '',
      },
    };
  },
  methods: {
    submit: _.debounce(function() {
      this.overtime.userId = this.$store.state.user;
      this.overtime.firstName = this.$store.state.firstName;
      this.overtime.lastName = this.$store.state.lastName;
      console.log('last name' + this.overtime.lastName);
      axios
        .post(
          'https://overtime-service.azurewebsites.net/api/overtime',
          this.overtime,
        )
        .then(response => {
          this.$store.dispatch('addOT', response.data);
          this.overtime.fromTime = '';
          this.overtime.toTime = '';
          this.overtime.totalTime = 0;
          this.overtime.reason = '';

          alert('data is submitted');
        })
        .catch(e => {
          console.error(e);
          console.log(e);
        });
    }, 1000),
    getManager: function() {
      axios
        .get(
          'https://overtime-service.azurewebsites.net/api/employees/' +
            this.$store.state.employeeId,
        )
        .then(response => {
          var emp = response.data;
          console.log('get manager' + emp.managerId);
          axios
            .get(
              'https://overtime-service.azurewebsites.net/api/employees/' +
                emp.managerId,
            )
            .then(response2 => {
              console.log(response2);
              this.overtime.employeeId = this.$store.state.employeeId;
              this.overtime.approverId = response2.data.employeeId;
              this.manager.email = response2.data.email;
              this.manager.firstName = response2.data.firstName;
              this.manager.lastName = response2.data.lastName;
            });
        })
        .catch(e => {
          console.error(e);
        });
    },
    hourDiff: function() {
      var a = moment(
        this.overtime.toTime,
        moment.HTML5_FMT.DATETIME_LOCAL_SECONDS,
      );
      var b = moment(
        this.overtime.fromTime,
        moment.HTML5_FMT.DATETIME_LOCAL_SECONDS,
      );
      console.log(
        moment(this.overtime.toTime, moment.HTML5_FMT.DATETIME_LOCAL_SECONDS),
      );
      //      console.log(this.overtime.fromTime);
      this.overtime.totalTime = (a - b) / 60000;
      //console.log("aaaaaa" + (a - b));
    },
  },
  computed: {},
  mounted() {
    this.getManager();
  },
};
</script>
