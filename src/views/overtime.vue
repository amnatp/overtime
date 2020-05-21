<template>
  <div>
    <h4 class="text-center">Your Overtime</h4>
    <div class="container-fluid row">
      <div class="col-md-4">
        <overtime-create></overtime-create>
      </div>
      <div class="col-md-8">
        <overtime-List></overtime-List>
      </div>
    </div>
  </div>
</template>
<script>
import OvertimeList from '@/components/overtime/list';
import OvertimeCreate from '@/components/overtime/create';
export default {
  name: 'OverTime',
  components: {
    OvertimeList,
    OvertimeCreate,
  },
  methods: {},
  mounted() {},
};
</script>
