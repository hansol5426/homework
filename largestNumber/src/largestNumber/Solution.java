package largestNumber;

import java.util.Arrays;
import java.util.Comparator;

class Solution {
    public String solution(int[] numbers) {
        
        String answer = "";
        
        // 숫자 -> 문자열로 변환위해 문자열 배열 생성
        String[] numStr = new String[numbers.length];
        
        // 숫자 -> 문자열로 변환
        for(int i = 0; i <numbers.length; i++){
            // numbers에 숫자를 String 타입으로 변환
            numStr[i] = String.valueOf(numbers[i]);
        }
        
        // 두 수를 붙여서 비교했을 때 더 큰 수가 앞으로 오게 정렬
        // compareTo : 두 문자열을 비교하여 순서를 정함
        // (b+a)가 (a+b)보다 크면 양수  -> b가 먼저
        // (b+a)가 (a+b)보다 작으면 음수 -> a가 먼저
        Arrays.sort(numStr,new Comparator<String>() {
            @Override
            public int compare(String a, String b) {
                return (b + a).compareTo(a + b);   
            }
        });
        
        // 만약 배열의 첫번째 값이 0이면 0을 리턴
        // => 이미 정렬을 해서 제일 큰 값이 배열의 첫번째 값
        //    따라서 첫번째 값이 0일 경우 나머지 값도 0
        if(numStr[0].equals("0")) return "0";
        
        // 정렬된 문자열 이어붙이기
        for(String s : numStr){
            answer += s;
        }        
        
        return answer;
    }
}
