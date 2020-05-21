<template>
  <div class="container">
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
        <div class="col-sm-5">
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
            v-on:input=""
          ></datetime>
        </div>
      </div>
      <div class="form-group row">
        <label for="totalTime" class="col-sm-3">Total time</label>
        <div class="col-sm-6">
          <b-form-input
            type="number"
            id="totalTime"
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
import {Thai} from 'flatpickr/dist/l10n/th.js';
import axios from 'axios';
var overtime;
export default {
  name: 'OvertimeDetail',
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
        fromTime: '2019-09-02T16:00:00',
        toTime: '2019-09-02T18:00:00',
        totalTime: '2',
        reason: 'test reason',
      },
    };
  },
  methods: {
    submit: function() {
      axios
        .post('https://overtime-service.azurewebsites.net/api/overtime', this.overtime)
        .then(response => {
          this.overtime = response.data;
          console.log(response);
        })
        .catch(e => {
          console.error(e);
        });
    },
  },
};
</script>
