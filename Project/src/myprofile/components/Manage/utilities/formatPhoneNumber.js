
//formate a phone number from 1234567890 to 123.456.7890
export default function(givenPh){
  return  givenPh.replace(/(\d{3})(\d{3})(\d{4})/, "$1.$2.$3")
}
