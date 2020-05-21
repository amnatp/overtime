<template>
<div>
<table>
    <tr>
        <td><label asp-for="UserName">User Name :
        </label></td>
        <td><input name="UserName" type="text" /></td>
    </tr>
    <tr>
        <td colspan="2">
            <input type="submit"
                   value="Reset Password" />
        </td>
    </tr>
</table>
</div>
</template>
<script>


export default {
  name: 'ForgetPassword'
}
</script>
