package overtime;

import java.util.*;

class Solution {
    public long solution(int n, int[] works) {  
        
        while(n>0){
            // 남은 작업량 오름차순 정렬 => 맨 뒤가 가장 큰 수
            Arrays.sort(works);
            // 남은 작업량 중 가장 큰 수를 max에 저장
            int max = works[works.length-1];
            // 가장 큰 수가 0이면 남은 작업량이 없으므로 피로도 0
            if(max == 0) break;
            // 작업량 중 max와 같은 값에 1 차감
            for(int i = 0; i < works.length; i++){
                if(works[i] == max){
                    works[i]--;
                    n--;
                }
                // n이 0이 되었다면 끝
                if(n == 0) break;
            }

        }
        
        long answer = 0;
        // 피로도 구하기
        // 남은 작업량 제곱
        for(int w : works){
            answer += (w*w);
        }            
            
        return answer;
 
    }
}


