package parkingFees;
import java.util.TreeMap;
import java.util.HashMap;
import java.util.Map;

class Solution {
    public int[] solution(int[] fees, String[] records) {

        // 차량 정보 담을 맵
        Map<String,Integer> parking = new HashMap<>();
        // 누적 시간 담을 맵 -> 자동 오름차순 정렬
        Map<String,Integer> totalTime = new TreeMap<>();

        // 차량 내역 배열에 나눠서 담기
        for(String r : records){
            String[] carList = r.split(" ");
            String time = carList[0];
            String carNumber = carList[1];
            String inoutList = carList[2];


        // 시간 분으로 바꾸기 위해 정수로 변경
        String[] m = time.split(":");
        int hTime = Integer.parseInt(m[0]);
        int mTime = Integer.parseInt(m[1]);
        // 분으로 환산
        int totalminute = hTime * 60 + mTime;


            // 입차정보 맵에 담기
            // 만약 차량번호가 없다면 맵에 넣기 -> 입차
            if(!parking.containsKey(carNumber)){
                parking.put(carNumber,totalminute);
            // 차량번호가 있다면 맵에서 입차 차량 꺼내서 빼기 -> 출차 - 입차    
            }else{
                int inTime = parking.get(carNumber);
                int parkingTime = totalminute-inTime;

                // 계산한 입차 정보 삭제
                parking.remove(carNumber);
                // 누적 주차 시간 맵에 넣기
                totalTime.put(carNumber,totalTime.getOrDefault(carNumber,0)+parkingTime);
            }
         }

        // 맵에 남은 정보는 23:59분 에서 빼기
       for(String carNumber:parking.keySet()){
           int inTime = parking.get(carNumber);
           int parkingTime = (23 * 60 + 59) - inTime;
           // 누적 주차 시간 맵에 넣기
           totalTime.put(carNumber,totalTime.getOrDefault(carNumber,0)+parkingTime);
       }           

        // 주차 요금 계산   
        // 시간 맵의 사이즈만큼 배열 생성
        int[] answer = new int[totalTime.size()];
        int i = 0;

        int parkingFee = 0;
        // 차량 번호마다 주차요금 구하기
        for(String carNumber:totalTime.keySet()){
            int totalParkingTime = totalTime.get(carNumber);

             // 만약 누적주차시간 - 기본시간 = 0 or 음수면 기본 요금 청구
            if(totalParkingTime-fees[0] <= 0){
                parkingFee = fees[1];
             // 기본시간 초과되었다면 단위 시간으로 나누기
            }else {
                int overTime = totalParkingTime-fees[0];
                // 나눈 결과가 0이 아니면 올림 처리
                int roundUp = (int) Math.ceil((double) overTime / fees[2]);
                // 주차 요금
                parkingFee = fees[1] + roundUp * fees[3]; 
            }

            // 주차 요금 배열에 담기
            answer[i] = parkingFee;
            i++;
        }

        return answer;
    }
}