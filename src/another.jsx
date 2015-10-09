<Quiz initialScore={{asus:0, netgear: 0, apple: 0}}>
    <script event="questionAnswered">
        function(answerValue, currentScore) {
            return {
                asus: currentScore.asus + answerValue.asus,
                netgear: currentScore.netgear + answerValue.netgear,
                apple: currentScore.apple + answerValue.apple
            }
        }
    </script>
    <h3>What brand do you like best?</h3>

    <MultipleChoiceQuestion>
        <Answer value={{asus:10}}>Asus.</Answer>
        <Answer value={{netgear:10}}>Netgear.</Answer>
        <Answer value={{apple:10}}>Apple.</Answer>
    </MultipleChoiceQuestion>

    <End/>
</Quiz>
