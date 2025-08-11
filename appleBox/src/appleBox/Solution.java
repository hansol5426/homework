package appleBox;

import java.util.Arrays;

class Solution {
    public int solution(int k, int m, int[] score) {
        
        // 사과 점수 오름차순으로 정렬
        Arrays.sort(score);
        
        int answer = 0;
        // 만들어질 수 있는 상자 수
        int box = score.length / m;
        
        // 이익 구하기
        for(int i = 1; i <= box; i++){
            // 최저스코어를 담고있는 인덱스 구하기
            int minI = score.length - i * m;
            // 인덱스의 스코어를 담음
            int minScore = score[minI];  
            // (최저스코어 * 사과 수) 를 다 더함
            answer += minScore * m;
        }
        
        return answer;
    }
}
