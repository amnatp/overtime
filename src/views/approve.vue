<template>
  <div>
    <h4 class="text-center">Waiting for your approval</h4>

    <approve-queue></approve-queue>
  </div>
</template>
<script>
import ApproveQueue from "@/components/overtime/approvequeue";
export default {
  name: "Approve",
  components: {
    ApproveQueue
  }
};
</script>
