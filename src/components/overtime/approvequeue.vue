<template>
  <div class="container row">
    <table class="table">
      <thead class="thead-light">
        <tr>
          <th>Action</th>
          <th>Request no</th>
          <th>Emp ID</th>
          <th>Emp name</th>
          <th>From</th>
          <th>to</th>
          <th>total</th>

          <th>Reject</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(ot, index) in overTimes" :key="ot.id" @click="select(ot)">
          <td>
            <b-button variant="success" @click="approve(ot, index)"
              >approve</b-button
            >
          </td>
          <td>{{ ot.id }}</td>
          <td>{{ ot.employeeId }}</td>
          <td>{{ ot.firstName + ' ' + ot.lastName }}</td>
          <td>
            {{ ot.fromTime | moment('timezone', 'Asia/Bangkok', 'LLLL') }}
          </td>
          <td>{{ ot.toTime | moment('timezone', 'Asia/Bangkok', 'LLLL') }}</td>
          <td>{{ ot.totalTime }}</td>

          <td>
            <b-button variant="danger" @click="reject(ot, index)"
              >Reject</b-button
            >
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
var ots = [];
export default {
  name: 'ApproveQueue',
  data() {
    return {
      overTimes: [],
      selectItem: null,
    };
  },
  methods: {
    select(a) {
      this.selectItem = a;
    },
    approve(overtime, index) {
      overtime.status = 'approved';
      this.$http
        .put(
          `https://overtime-service.azurewebsites.net/api/overtime/${overtime.id}`,
          overtime,
        )
        .then(response => {
          this.overTimes.splice(index, 1);
        });
    },
    reject(a, index) {
      a.status = 'rejected';
      this.$http
        .put(
          `https://overtime-service.azurewebsites.net/api/overtime/${a.id}`,
          a,
        )
        .then(response => {
          this.overTimes.splice(index, 1);
        });
    },
  },
  mounted() {
    console.log(this.$store.state.user);
    if (this.$store.state.approveList.length > 0) {
      this.overTimes = this.$store.state.approveList;
      return;
    }
    this.$http
      .get('https://overtime-service.azurewebsites.net/api/overtime', {
        params: {approverId: this.$store.state.employeeId},
      })
      .then(response => {
        console.log(response);
        //        return response;
        this.$store.dispatch('loadApproveList', response.data);
        this.overTimes = response.data;
      });
  },
};
</script>
