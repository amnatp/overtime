<template>
  <div class="table-responsive">
    <table class="table" v-if="overTimes">
      <thead class="thead-light">
        <tr>
          <th>Leave No</th>
          <th>Status</th>
          <th>From</th>
          <th>to</th>
          <th>total</th>
          <th>Reason</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="a in overTimes">
          <td>{{ a.id }}</td>
          <td>{{ a.status }}</td>
          <td>
            {{
              a.fromTime
                | moment('timezone', 'Asia/Bangkok', 'ddd DD MMM hh:mm')
            }}
          </td>
          <td>
            {{
              a.toTime | moment('timezone', 'Asia/Bangkok', 'ddd DD MMM hh:mm')
            }}
          </td>
          <td>
            {{ Math.floor(a.totalTime / 60) }}hr
            {{ a.totalTime % 60 ? (a.totalTime % 60) + 'mi' : '' }}
          </td>
          <td>{{ a.reason }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  name: 'OvertimeList',
  data() {
    return {
      overTimes: null,
    };
  },
  methods: {},

  mounted() {
    //ots = this.$store.state.overtimes;
    //this.setOverTime();i
    console.log('overTimes : ' + this.$store.state.overtimes);
    if (this.$store.state.overtimes.length < 1) {
      this.$http
        .get('https://overtime-service.azurewebsites.net/api/overtime', {
          params: {employeeId: this.$store.state.employeeId},
        })
        .then(response => {
          console.log(response);
          this.$store.dispatch('loadOTs', response.data);
          this.overTimes = this.$store.state.overtimes;
        });
    } else {
      this.overTimes = this.$store.state.overtimes;
    }
  },
};
</script>
