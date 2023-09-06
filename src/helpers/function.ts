export const upgradeGrade = (grade) => {
  switch (grade) {
    case 'TKA':
      return 'TKB';
    case 'TKB':
      return 'SD 1';
    case 'SD 1':
      return 'SD 2';
    case 'SD 2':
      return 'SD 3';
    case 'SD 3':
      return 'SD 4';
    case 'SD 4':
      return 'SD 5';
    case 'SD 5':
      return 'SD 6';
    case 'SD 6':
      return 'SMP 7';
    case 'SMP 7':
      return 'SMP 8';
    case 'SMP 8':
      return 'SMP 9';
    case 'SMP 9':
      return 'SMA 10';
    case 'SMA 10':
      return 'SMA 11';
    case 'SMA 11':
      return 'SMA 12';
    case 'SMA 12':
      return 'SMA 12';
    default:
      break;
  }
};

export const upgradeUnit = (unit) => {
  switch (unit) {
    case 'KB/TK MARIA YACHINTA':
      return 'SD MARIA FRANSISKA';
    case 'SD MARIA FRANSISKA':
      return 'SMP PAX ECCLESIA';
    case 'SMP PAX ECCLESIA':
      return 'SMA PAX PATRIAE';
    default:
      break;
  }
};
